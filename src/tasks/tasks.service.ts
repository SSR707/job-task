import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel('task') private taskModel: Model<Task>) {}
  async create(createTaskDto: CreateTaskDto, userId: string) {
    const createdTask = await this.taskModel.create({
      ...createTaskDto,
      createdBy: userId,
      dueDate: new Date(createTaskDto.dueDate),
    });
    return {
      status: HttpStatus.CREATED,
      message: 'created',
      data: createdTask,
    };
  }

  async findAll() {
    const TaskData = await this.taskModel.find().populate('createdBy');
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: TaskData,
    };
  }

  async findOne(id: string) {
    const currentTask = await this.taskModel.findById(id).populate('createdBy');
    if (!currentTask) {
      throw new NotFoundException('Task Not Found ');
    }
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: currentTask,
    };
  }

  async update(id: string, updateTaskDto: UpdateTaskDto) {
    const currentTask = await this.taskModel.findById(id);
    if (!currentTask) {
      throw new NotFoundException('Task Not Found ');
    }
    if (updateTaskDto?.dueDate) {
      updateTaskDto.dueDate = new Date(updateTaskDto.dueDate);
    }
    const updatedTask = await this.taskModel.findByIdAndUpdate(
      id,
      updateTaskDto,
      {
        new: true,
        runValidators: true,
      },
    );
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: updatedTask,
    };
  }

  async remove(id: string) {
    const currentTask = await this.taskModel.findById(id);
    if (!currentTask) {
      throw new NotFoundException('Task Not Found ');
    }
    await this.taskModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'success',
    };
  }
}
