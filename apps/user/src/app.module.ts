import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { envVariableKeys } from '@app/config/env';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '@app/user/auth/auth.controller';
import { JwtStrategy } from '@app/user/auth/strategy/jwt.strategy';
import { UserController } from '@app/user/user/interfaces/controller/user.controller';
import { UserService } from '@app/user/user/user.service';

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
        entities: [],
        synchronize: configService.get<string>(process.env.NODE_ENV) !== 'production',
        ...(configService.get<string>(process.env.NODE_ENV) === 'production' && {
          ssl: {
            rejectUnauthorized: false,
          },
        }),
      }),
      inject: [ConfigService],
    }),

    JwtModule.register({}),
  ],
  controllers: [AuthController, UserController],
  providers: [JwtStrategy, UserService],
  exports: [JwtModule],
})
export class AppModule {}
