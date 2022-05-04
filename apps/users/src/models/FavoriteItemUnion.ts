import { createUnionType } from '@nestjs/graphql';
import { Song } from './Song.model';
import { Book } from './Book.model';

export const FavoriteItemUnion = createUnionType({
  name: 'FavoriteItemUnion',
  types: () => [Song, Book] as const,
  resolveType: (value) => {
    switch (value.__typename) {
      case 'Song':
        return Song;
      case 'Book':
        return Book;
      default:
        return null;
    }
  },
});
