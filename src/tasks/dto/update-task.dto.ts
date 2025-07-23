import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';
import { TaskEnum } from 'src/common';
import { IsEnum, IsOptional } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({
    description: 'Status of the task',
    example: TaskEnum.InPROGRESS,
    enum: TaskEnum,
    enumName: 'TaskEnum',
  })
  @IsOptional()
  @IsEnum(TaskEnum)
  status?: TaskEnum;
}
