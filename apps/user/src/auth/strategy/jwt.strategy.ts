import { Injectable } from '@nestjs/common';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAuthGuard extends AuthGuard('jwt') {}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      // * Bearer token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'ACCESS_TOKEN_SECRET',
      // secretOrKey: configService.get('ACCESS_TOKEN_SECRET'),
    });
  }

  validate(payload: any) {
    // * token속 담겨진 data
    return payload;
  }
}
