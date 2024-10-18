import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ClientKafka, ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
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
  constructor(@Inject('AUTH_SERVICE') private readonly authClient: ClientKafka) {}

  async onModuleInit() {
    // * 각 클라이언트가 응답을 받을 수 있도록 설정합니다.
    this.authClient.subscribeToResponseOf('auth_login');
    await this.authClient.connect();
  }
}
