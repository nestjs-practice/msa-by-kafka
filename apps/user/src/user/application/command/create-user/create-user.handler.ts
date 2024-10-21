import { Inject, Injectable } from '@nestjs/common';
import {
  IUserRepository,
  UserRepositoryToken,
} from '@app/user/user/infrastructure/repository/i.user.repository';
import { SignUpRequestDto } from '@app/common/dto/auth/sign-up.request.dto';
import { User } from '@app/user/user/domain/model/user';
import { RpcException } from '@nestjs/microservices';
import { JwtTokenService } from '@app/user/auth/jwt/jwt-token.service';

@Injectable()
export class CreateUserHandler {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: SignUpRequestDto) {
    const existUser = await this.userRepository.findOneByEmail(dto.email);
    if (existUser) {
      throw new RpcException('Duplicate User');
    }
    const user = User.new(dto);
    await this.userRepository.upsert(user);
  }
}
