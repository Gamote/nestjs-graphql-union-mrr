import { Args, Query, Resolver, ResolveReference } from '@nestjs/graphql';
import { User } from '../models/User.model';
import { UsersService } from '../services/Users.service';
import { FavoriteItemUnion } from '../models/FavoriteItemUnion';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User)
  async getUserById(@Args('id') id: number) {
    return this.usersService.getById(id);
  }

  /**
   * EXAMPLE: 1
   * Types references ARE resolved for the `FavoriteItemUnion` union type when used in a `Query`
   */
  @Query(() => FavoriteItemUnion)
  async topItem() {
    return { __typename: 'Song', id: 3 };
  }

  @ResolveReference()
  async resolveReference(reference: { __typename: string; id: number }) {
    return this.usersService.getById(reference.id);
  }
}
