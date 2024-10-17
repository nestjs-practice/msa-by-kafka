import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  @MessagePattern('auth_login')
  async login(@Payload() dto: { username: string; password: string }) {
    console.log(dto);
    return 'success';
  }
}
