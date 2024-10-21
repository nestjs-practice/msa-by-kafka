import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/user/infrastructure/repository/i.user.repository';
import { SignInRequestDto } from '@app/common/dto/auth/sign-in.request.dto';
import bcrypt from 'bcrypt';
import { RpcException } from '@nestjs/microservices';
import { JwtTokenService } from '@app/user/auth/jwt/jwt-token.service';
import { ConfigService } from '@nestjs/config';
import { envVariableKeys } from '@app/config/env';

@Injectable()
export class LoginUserHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
    private readonly jwtTokenService: JwtTokenService,
    private readonly configService: ConfigService,
  ) {}

  async execute(dto: SignInRequestDto) {
    const existUser = await this.userRepository.findOneByEmail(dto.email);
    console.log(dto);
    const comparePassword = bcrypt.compareSync(dto.password, existUser.getPassword());
    console.log(comparePassword);
    if (!existUser || !comparePassword) {
      throw new RpcException('Invalid Email or Password');
    }
    // * generate token
    const accessToken = await this.jwtTokenService.generateToken(
      existUser.getId()!,
      this.configService.get<string>(envVariableKeys.accessTokenSecret),
      '1d',
    );
    const refreshToken = await this.jwtTokenService.generateToken(
      existUser.getId()!,
      this.configService.get<string>(envVariableKeys.refreshTokenSecret),
      '14d',
    );
    return { accessToken, refreshToken };
  }
}
