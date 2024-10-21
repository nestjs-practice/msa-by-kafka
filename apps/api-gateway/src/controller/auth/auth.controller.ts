import { Body, Controller, HttpException, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { SignInRequestDto } from '@app/common/dto/auth/sign-in.request.dto';
import { SignUpRequestDto } from '@app/common/dto/auth/sign-up.request.dto';
import { catchError } from 'rxjs';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly authClient: ClientKafka,
  ) {}

  @Post('/sign-in')
  signIn(@Body() dto: SignInRequestDto) {
    // * 각 클라이언트가 응답을 받을 수 있도록 설정합니다.
    return this.authClient.send('auth_login', dto).pipe(
      catchError((err: any) => {
        throw new HttpException(
          { status: err.status, message: err.message },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
  }

  @Post('/sign-up')
  signUp(@Body() dto: SignUpRequestDto) {
    // * 각 클라이언트가 응답을 받을 수 있도록 설정합니다.
    const response = this.authClient.send('auth_register', dto).pipe(
      catchError((err: any) => {
        throw new HttpException(
          { status: err.status, message: err.message },
          HttpStatus.BAD_REQUEST,
        );
      }),
    );
    return response;
  }
}
