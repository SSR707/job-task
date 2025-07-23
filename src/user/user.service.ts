import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel('users') private userModel: Model<User>) {}

  async getProfile(id: string) {
    const userProfile = await this.userModel.findById(id).select('-password');
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: userProfile,
    };
  }

  async findAll() {
    const users = await this.userModel.find();
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: users,
    };
  }

  async findOne(id: string) {
    const currentUser = await this.userModel.findById(id);
    if (!currentUser) {
      throw new NotFoundException('User Not Found');
    }
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: currentUser,
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const currentUser = await this.userModel.findById(id);
    if (!currentUser) {
      throw new NotFoundException('User Not Found');
    }
    const updatedUser = await this.userModel.findByIdAndUpdate(id, {
      name: updateUserDto.name,
    });
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: currentUser,
    };
  }

  async remove(id: string) {
    const currentUser = await this.userModel.findById(id);
    if (!currentUser) {
      throw new NotFoundException('User Not Found');
    }
    await this.userModel.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      message: 'success',
    };
  }
}
