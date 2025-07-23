import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AdminGuard, UserID } from 'src/common';

@ApiTags('User Crud')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Get User Profile' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @Get('getProfile')
  getProfile(@UserID() id: string) {
    return this.userService.getProfile(id);
  }

  @Get()
  @UseGuards(AdminGuard)
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get Course By ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'success',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Course Not Found',
  })
  @Get(':id')
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Course By ID' })
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
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete Course By ID' })
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
    return this.userService.remove(id);
  }
}
