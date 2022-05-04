import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  db = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      favoriteItem: { __typename: 'Song', id: 1 },
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Doe',
      favoriteItem: { __typename: 'Song', id: 2 },
    },
  ];

  async getById(id: number) {
    return this.db.find((user) => user.id === id);
  }
}
