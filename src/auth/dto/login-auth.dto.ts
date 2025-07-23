import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDto {
  @ApiProperty({
    description: 'Please enter your email address',
    example: 'johndoe@gmail.com',
  })
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'Please enter your password',
    example: 'strongPassword123',
  })
  @IsNotEmpty()
  password: string;
}
