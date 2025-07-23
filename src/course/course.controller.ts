import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AdminGuard, UserID } from 'src/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Course Crud')
@ApiBearerAuth()
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Reagister to course' })
  @ApiParam({ name: 'courseId', type: String, description: 'ID of the course' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User successfully registered to course',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Course Not Found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User is already registered to this course',
  })
  @Post(':courseId/regiter')
  registerCourse(
    @Param('courseId') courseId: string,
    @UserID() userId: string,
  ) {
    return this.courseService.registerCourse(courseId, userId);
  }

  @ApiOperation({ summary: 'Create course' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Course successfully created',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'endDate must be after startDate',
  })
  @UseGuards(AdminGuard)
  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @ApiOperation({ summary: 'Get Student Courses' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the student' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @Get('/students/:id/courses')
  findStudentCourse(@Param('id') studentId: string) {
    return this.courseService.findStudentCourse(studentId);
  }

  @ApiOperation({ summary: 'Get All Courses' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @ApiOperation({ summary: 'Get Course By ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the course' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Course Not Found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.courseService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Course By ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the course' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Course Not Found',
  })
  @Put(':id')
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.update(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete Course By ID' })
  @ApiParam({ name: 'id', type: String, description: 'ID of the course' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Course Not Found',
  })
  @Delete(':id')
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.courseService.remove(id);
  }
}
