import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    description: 'Title of the course',
    example: 'Backend',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'Optional description of the course content',
    example: 'This Backend course',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Start date of the course in YYYY-MM-DD format',
    example: '2025-08-01',
  })
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({
    description: 'End date of the course in YYYY-MM-DD format',
    example: '2025-09-15',
  })
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;
}
