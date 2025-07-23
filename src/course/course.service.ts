import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './entities/course.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel('course') private courseModel: Model<Course>,
    @InjectModel('users') private userModel: Model<User>,
  ) {}

  async registerCourse(courseId: string, userId: string) {
    const currentCourse = await this.courseModel.findById(courseId);
    if (!currentCourse) {
      throw new NotFoundException('Course Not Found');
    }
    const alreadyRegistered = await this.userModel
      .findOne({
        _id: userId,
        registeredCourses: courseId,
      })
      .select('-password');

    if (alreadyRegistered) {
      throw new BadRequestException(
        'User is already registered to this course',
      );
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(
      userId,
      {
        $push: { registeredCourses: courseId },
      },
      { new: true },
    );
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: updatedUser,
    };
  }
  async create(createCourseDto: CreateCourseDto) {
    if (
      new Date(createCourseDto.endDate) < new Date(createCourseDto.startDate)
    ) {
      throw new BadRequestException('endDate must be after startDate');
    }

    const createdCourse = await this.courseModel.create(createCourseDto);
    return {
      status: HttpStatus.CREATED,
      message: 'created',
      data: createdCourse,
    };
  }

  async findAll() {
    const courseData = await this.courseModel.find();
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: courseData,
    };
  }
  async findStudentCourse(studentId: string) {
    const studentCourses = await this.userModel
      .findById(studentId)
      .select('registeredCourses')
      .populate('registeredCourses');
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: studentCourses,
    };
  }

  async findOne(id: string) {
    const currentCourse = await this.courseModel.findById(id);
    if (!currentCourse) {
      throw new NotFoundException('Course Not Found');
    }
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: currentCourse,
    };
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    const currentCourse = await this.courseModel.findById(id);
    if (!currentCourse) {
      throw new NotFoundException('Course Not Found');
    }
    if (updateCourseDto?.startDate)
      updateCourseDto.startDate = new Date(updateCourseDto.startDate);
    if (updateCourseDto?.endDate)
      updateCourseDto.endDate = new Date(updateCourseDto.endDate);
    if (
      updateCourseDto?.startDate &&
      updateCourseDto?.endDate &&
      new Date(updateCourseDto.endDate) < new Date(updateCourseDto.startDate)
    )
      throw new BadRequestException('endDate must be after startDate');

    const updatedCourse = await this.courseModel.findByIdAndUpdate(
      id,
      updateCourseDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: updatedCourse,
    };
  }

  async remove(id: string) {
    const currentCourse = await this.courseModel.findById(id);
    if (!currentCourse) {
      throw new NotFoundException('Course Not Found');
    }
    await this.courseModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'success',
    };
  }
}
