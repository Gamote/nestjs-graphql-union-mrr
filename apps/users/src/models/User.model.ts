import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';
import { FavoriteItemUnion } from './FavoriteItemUnion';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  /**
   * EXAMPLE: 2
   * Types references ARE NOT resolved for the `FavoriteItemUnion` union type when used in a `Field`
   */
  @Field(() => FavoriteItemUnion)
  favoriteItem: typeof FavoriteItemUnion;
}
