import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SignInRequestDto } from '@app/common/dto/auth/sign-in.request.dto';

@Controller()
export class AuthController {
  @MessagePattern('auth_login')
  async login(@Payload() dto: SignInRequestDto) {
    return Promise.resolve(dto);
  }
}
