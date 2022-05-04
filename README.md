# Nest.js GraphQL Union Issue Minimum Reproduction Repo

Tech used
- Nest.js `v8.0.0`
- Nest.js GraphQL `v10.0.10` (Gateway + Federation)
- Mercurius `v9.4.0` (with Fastify)

## Issue description

TL;DR: References part of a union type can't be resolved by the GraphQL Gateway (federation) when is used as a type for a field. If the union type is used as return type for a Query or Mutation all it works as expected.

As you know, when working with GraphQL Federation one service can return a type reference (e.g. `{ __typename: 'Song', id: '1' }`) that can later be resolved by another service.
In this service we have created a union type called `FavoriteItemUnion` that contains the `Song` model (extension of the `Song` type defined in the `songs` service) and the `Book` model (extension of the `Book` type defined in the `books` service).

### Working example
When `FavoriteItemUnion` is used as return type for a Query, GraphQL is able to retrieve the data from the appropriate service.

```typescript
// Query resolver defined in the `users` service
@Query(() => FavoriteItemUnion)
async topItem() {
  return { __typename: 'Song', id: 3 };
}
```

```graphql
# Query to retrieve the top item
query TopItemQuery {
  topItem {
    ... on Song {
      id
      title
    }
  }
}
```

```json
// Query result
{
  "data": {
    "topItem": {
      "id": 3,
      "title": "Song 3"
    }
  }
}
```

### Issue example
When `FavoriteItemUnion` is used as return type for a field in an Object type.

```typescript
// Field definition in the `users` service
@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;
  
  // This field returns a union type
  @Field(() => FavoriteItemUnion)
  favoriteItem: typeof FavoriteItemUnion;
}
```

```typescript
// Query resolver defined in the `users` service
@Query(() => User)
async getUserById(@Args('id') id: number) {
  return this.usersService.getById(id);
  /*
    ^ For `userId=1` will return the following:
    {
      "id": 1,
      "firstName": "John",
      "lastName": "Doe",
      "favoriteItem": {
        "__typename": "Song",
        "id": 1
      }
    }
  */
}
```

```graphql
# Query to retrieve the user + his favorite item
query GetUserById {
  getUserById(id: 1) {
    id
    firstName
    lastName
    favoriteItem {
      ... on Song {
        id
        title
      }
    }
  }
}
```

```json
{
  "errors": [
    {
      "message": "Cannot return null for non-nullable field Song.title.",
      "locations": [
        {
          "line": 9,
          "column": 9
        }
      ],
      "path": [
        "getUserById",
        "favoriteItem",
        "title"
      ]
    }
  ],
  "data": null
}
```

In this case, if we remove the `title` from the query, we will get a response as GraphQL doesn't need to resolve any more data.

## How to run

1. Install dependencies
    ```bash
    $ yarn
    ```
   
2. Start the federated services
    ```bash
    # Users service
    $ yarn start users
   
    # Songs service
    $ yarn start songs
   
    # Books service
    $ yarn start books
    ```

3. Start the gateway
    ```bash
    $ yarn start
    ```

Now you can visit the gateway at `http://localhost:3010/graphql` and use the queries described above.
``