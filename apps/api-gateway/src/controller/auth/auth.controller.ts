import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignInRequestDto } from '@app/common/dto/auth/sign-in.request.dto';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientKafka,
  ) {}

  @Post('/sign-in')
  login(@Body() dto: SignInRequestDto) {
    return this.authClient.send('auth_login', dto);
  }
}
