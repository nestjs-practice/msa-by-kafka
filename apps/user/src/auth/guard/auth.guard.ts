import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Public } from '../decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // * 만약에 public decoration이 되어있다면
    // * 모든 로직을 bypass
    const isPublic = this.reflector.get(Public, context.getHandler());

    if (isPublic) {
      return true;
    }

    // * 요청에서 user 객체가 존재하는 확인
    const request = context.switchToHttp().getRequest();

    // * public이 아님에도 토큰객체가 없다면 false
    if (!request.user) {
      return false;
    }
    return true;
  }
}
