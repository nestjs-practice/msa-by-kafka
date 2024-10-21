import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInRequestDto } from '@app/common/dto/auth/sign-in.request.dto';
import { SignUpRequestDto } from '@app/common/dto/auth/sign-up.request.dto';
import { CreateUserHandler } from '@app/user/user/application/command/create-user/create-user.handler';
import { LoginUserHandler } from '@app/user/user/application/command/login-user/login-user.handler';

@Controller()
export class AuthController {
  constructor(
    private readonly createUserHandler: CreateUserHandler,
    private readonly loginUserHandler: LoginUserHandler,
  ) {}

  @MessagePattern('auth_login')
  async signIn(@Payload() dto: SignInRequestDto) {
    return this.loginUserHandler.execute(dto);
  }

  @MessagePattern('auth_register')
  async singUp(@Payload() dto: SignUpRequestDto) {
    await this.createUserHandler.execute(dto);
    return 'OK';
  }
}
