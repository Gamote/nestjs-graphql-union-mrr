import { Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { Book } from '../models/Book.model';
import { BooksService } from '../services/Books.service';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(() => [Book])
  async allBooks() {
    return this.booksService.db;
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Partial<Book>> {
    return this.booksService.getById(reference.id);
  }
}
