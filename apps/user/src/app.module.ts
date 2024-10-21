import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envVariableKeys } from '@app/config/env';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@app/user/auth/auth.controller';
import { JwtStrategy } from '@app/user/auth/strategy/jwt.strategy';
import { UserController } from '@app/user/user/interfaces/controller/user.controller';
import { UserEntity } from '@app/user/user/domain/entity/user.entity';
import { UserRepositoryToken } from '@app/user/user/infrastructure/repository/i.user.repository';
import { UserRepository } from '@app/user/user/infrastructure/repository/user.repository';
import { CreateUserHandler } from '@app/user/user/application/command/create-user/create-user.handler';
import { LoginUserHandler } from '@app/user/user/application/command/login-user/login-user.handler';
import { JwtTokenService } from '@app/user/auth/jwt/jwt-token.service';

const repositories = [{ provide: UserRepositoryToken, useClass: UserRepository }];
const handlers = [CreateUserHandler, LoginUserHandler];
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>(envVariableKeys.dbType) as 'mysql',
        host: configService.get<string>(envVariableKeys.dbHost),
        port: configService.get<number>(envVariableKeys.dbPort),
        username: configService.get<string>(envVariableKeys.dbUsername),
        password: configService.get<string>(envVariableKeys.dbPassword),
        database: configService.get<string>(envVariableKeys.dbUserDatabase),
        entities: [UserEntity],
        synchronize: configService.get<string>(process.env.NODE_ENV) !== 'production',
        ...(configService.get<string>(process.env.NODE_ENV) === 'production' && {
          ssl: {
            rejectUnauthorized: false,
          },
        }),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({}),
  ],
  controllers: [AuthController, UserController],
  providers: [JwtStrategy, JwtTokenService, ...handlers, ...repositories],
  exports: [JwtModule],
})
export class AppModule {}
