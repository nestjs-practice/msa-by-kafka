import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  @Post('/sign-in')
  login(@Body() dto: { username: string; password: string }): Observable<any> {
    return this.authClient.send('auth_login', dto);
  }
}
