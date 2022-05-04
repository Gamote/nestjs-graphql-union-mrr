import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import {
  MercuriusFederationDriver,
  MercuriusFederationDriverConfig,
} from '@nestjs/mercurius';
import { SongsService } from './services/Songs.service';
import { SongsResolver } from './resolvers/Songs.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<MercuriusFederationDriverConfig>({
      driver: MercuriusFederationDriver,
      autoSchemaFile: true,
      federationMetadata: true,
    }),
  ],
  providers: [SongsService, SongsResolver],
})
export class AppModule {}
