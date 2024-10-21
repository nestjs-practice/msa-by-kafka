import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInRequestDto } from '@app/common/dto/auth/sign-in.request.dto';
import { SignUpRequestDto } from '@app/common/dto/auth/sign-up.request.dto';

@Controller()
export class AuthController {
  constructor() {}

  @MessagePattern('auth_login')
  async signIn(@Payload() dto: SignInRequestDto) {}

  @MessagePattern('auth_register')
  async singUp(@Payload() dto: SignUpRequestDto) {}
}
