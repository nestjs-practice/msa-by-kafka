import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class JwtTokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(userId: number, secret: string, expiresIn: string | number) {
    const payload = {
      userId,
    };
    return this.jwtService.signAsync(payload, {
      secret,
      expiresIn,
    });
  }

  async verifyToken(token: string) {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new RpcException('Invalid Token');
    }
  }
}
