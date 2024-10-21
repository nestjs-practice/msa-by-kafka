import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'api-gateway',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'api-gateway-consumer-group',
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
})
export class ApiGatewayModule implements OnModuleInit {
  constructor(@Inject('USER_SERVICE') private readonly authClient: ClientKafka) {}

  async onModuleInit() {
    // todo: 토픽 목록 중앙화
    this.authClient.subscribeToResponseOf('auth_login');
    this.authClient.subscribeToResponseOf('auth_register');
    await this.authClient.connect();
  }
}
