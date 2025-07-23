import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { BcryptEncryption } from 'src/config/bcrypt/bcrypt';
import { CustomJwtService } from 'src/config';
import { UserRole } from 'src/common';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('users') private userModel: Model<User>,
    private jwt: CustomJwtService,
  ) {}

  async registerStudent(registerAuthDto: RegisterAuthDto) {
    const currentUser = await this.userModel.findOne({
      email: registerAuthDto.email,
    });
    if (currentUser) {
      throw new ConflictException('Email already exists');
    }
    const hashPass = await BcryptEncryption.encrypt(registerAuthDto.password);
    const createdUser = await this.userModel.create({
      ...registerAuthDto,
      password: hashPass,
      role: UserRole.STUDENT,
    });
    const { password, ...userWithoutPassword } = createdUser.toObject();
    return {
      status: HttpStatus.CREATED,
      message: 'created',
      data: userWithoutPassword,
    };
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const currentUser = await this.userModel.findOne({
      email: registerAuthDto.email,
    });
    if (currentUser) {
      throw new ConflictException('Email already exists');
    }
    const hashPass = await BcryptEncryption.encrypt(registerAuthDto.password);
    const createdUser = await this.userModel.create({
      ...registerAuthDto,
      password: hashPass,
      role: UserRole.ADMIN,
    });
    const { password, ...userWithoutPassword } = createdUser.toObject();
    return {
      status: HttpStatus.CREATED,
      message: 'created',
      data: userWithoutPassword,
    };
  }

  async login(loginAuthDto: LoginAuthDto) {
    const currentUser = await this.userModel.findOne({
      email: loginAuthDto.email,
    });
    if (!currentUser) {
      throw new NotFoundException('User Not Found ');
    }
    const isMatchPassword = await BcryptEncryption.compare(
      loginAuthDto.password,
      currentUser.password,
    );
    if (!isMatchPassword) {
      throw new BadRequestException('Invalid password');
    }
    const payload = {
      id: currentUser._id,
      sub: currentUser.email,
      role: currentUser.role,
    };
    const refresh_token = await this.jwt.generateRefreshToken(payload);
    const access_token = await this.jwt.generateAccessToken(payload);
    return {
      status: HttpStatus.OK,
      message: 'success',
      data: {
        access_token,
        access_token_expire: process.env.ACCESS_TOKEN_TIME,
        refresh_token,
        refresh_token_expire: process.env.REFRESH_TOKEN_TIME,
      },
    };
  }
}
