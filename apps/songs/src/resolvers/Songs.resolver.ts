import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Song } from '../models/Song.model';
import { SongsService } from '../services/Songs.service';

@Resolver(() => Song)
export class SongsResolver {
  constructor(private songsService: SongsService) {}

  @Query(() => [Song])
  async allSongs() {
    return this.songsService.db;
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Partial<Song>> {
    return this.songsService.getById(reference.id);
  }
}
