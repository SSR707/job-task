import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    description: 'Enter the title of the task',
    example: 'Finish NestJS project',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Optional description for the task',
    example: 'This task must be completed by Sunday.',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Due date of the task in string format (YYYY-MM-DD)',
    example: '2025-08-01',
  })
  @IsDateString()
  @IsNotEmpty()
  dueDate: Date;
}
