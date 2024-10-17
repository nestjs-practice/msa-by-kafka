import { Inject, Module, OnModuleInit } from '@nestjs/common';
import { ClientProxy, ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './controller/auth/auth.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'auth-group',
          },
        },
      },
      // {
      //   name: 'USER_SERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       brokers: ['localhost:9092'],
      //     },
      //     consumer: {
      //       groupId: 'user-group',
      //     },
      //   },
      // },
      // {
      //   name: 'ORDER_SERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       brokers: ['localhost:9092'],
      //     },
      //     consumer: {
      //       groupId: 'order-group',
      //     },
      //   },
      // },
      // {
      //   name: 'PRODUCT_SERVICE',
      //   transport: Transport.KAFKA,
      //   options: {
      //     client: {
      //       brokers: ['localhost:9092'],
      //     },
      //     consumer: {
      //       groupId: 'product-group',
      //     },
      //   },
      // },
    ]),
  ],
  controllers: [AuthController],
})
export class ApiGatewayModule implements OnModuleInit {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
    // @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    // @Inject('ORDER_SERVICE') private readonly orderClient: ClientProxy,
    // @Inject('PRODUCT_SERVICE') private readonly productClient: ClientProxy,
  ) {}

  async onModuleInit() {
    // * 각 클라이언트가 응답을 받을 수 있도록 설정합니다.
    await this.authClient.connect();
    // this.userClient.connect();
    // this.orderClient.connect();
    // this.productClient.connect();
  }
}
