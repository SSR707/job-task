import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CustomJwtService {
  constructor(private readonly jwtService: JwtService) {}

  async generateRefreshToken(payload: any): Promise<string> {
    try {
      const reafreshToken = this.jwtService.sign(payload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      });
      return reafreshToken;
    } catch (error) {
      throw new BadRequestException('Failed to generate refresh token.');
    }
  }
  async generateAccessToken(payload: any): Promise<string> {
    try {
      const accessToken = this.jwtService.sign(payload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      });
      return accessToken;
    } catch (error) {
      throw new BadRequestException('Failed to generate access token.');
    }
  }

  async verifyRefreshToken(refresh_token: string) {
    try {
      const data = await this.jwtService.verify(refresh_token, {
        secret: process.env.REFRESH_TOKEN_KEY,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(`Error on refresh token: ${error}`);
    }
  }

  async verifyAccessToken(access_token: string) {
    try {
      const data = await this.jwtService.verify(access_token, {
        secret: process.env.ACCESS_TOKEN_KEY,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(`Error on access token: ${error}`);
    }
  }
}
