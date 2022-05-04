import { Injectable } from '@nestjs/common';
import { Book } from '../models/Book.model';

@Injectable()
export class BooksService {
  db: Book[] = [
    {
      id: 1,
      title: 'The Lord of the Rings',
    },
    {
      id: 2,
      title: 'The Hobbit',
    },
  ];

  async getById(id: number): Promise<Book> {
    return this.db.find((book) => book.id === id);
  }
}
