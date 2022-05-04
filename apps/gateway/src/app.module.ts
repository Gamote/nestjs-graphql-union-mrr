import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusGatewayDriver,
  MercuriusGatewayDriverConfig,
} from '@nestjs/mercurius';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusGatewayDriverConfig>({
      driver: MercuriusGatewayDriver,
      gateway: {
        services: [
          {
            name: 'users',
            url: 'http://localhost:3020/graphql',
          },
          {
            name: 'songs',
            url: 'http://localhost:3030/graphql',
          },
          {
            name: 'books',
            url: 'http://localhost:3040/graphql',
          },
        ],
      },
    }),
  ],
})
export class AppModule {}
