import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@extends')
@Directive('@key(fields: "id")')
export class Song {
  @Field(() => Int)
  @Directive('@external')
  id: number;
}
