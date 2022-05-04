import { Directive, Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class Book {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;
}
