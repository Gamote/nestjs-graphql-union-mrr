import { Injectable } from '@nestjs/common';
import { Song } from '../models/Song.model';

@Injectable()
export class SongsService {
  db: Song[] = [
    {
      id: 1,
      title: 'Song 1',
    },
    {
      id: 2,
      title: 'Song 2',
    },
    {
      id: 3,
      title: 'Song 3',
    },
    {
      id: 4,
      title: 'Song 4',
    },
  ];

  async getById(id: number): Promise<Song> {
    return this.db.find((song) => song.id === id);
  }
}
