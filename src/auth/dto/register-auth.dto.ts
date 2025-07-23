import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterAuthDto {
  @ApiProperty({
    description: 'Please enter your  name',
    example: 'John Doe',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Please enter your email address',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Please enter new  strong password',
    example: 'strongPassword123',
  })
  @IsStrongPassword()
  @IsNotEmpty()
  password: string;
}
