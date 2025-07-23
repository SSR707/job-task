import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UserID } from 'src/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Task Crud')
@ApiBearerAuth()
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @ApiOperation({ summary: 'Created Task' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'created',
  })
  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @UserID() userId: string) {
    return this.tasksService.create(createTaskDto, userId);
  }

  @ApiOperation({ summary: 'Get All Tasks' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @ApiOperation({ summary: 'Get Task By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task Not Found',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Task By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task Not Found',
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(id, updateTaskDto);
  }

  @ApiOperation({ summary: 'Delete Task By Id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task Not Found',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(id);
  }
}
