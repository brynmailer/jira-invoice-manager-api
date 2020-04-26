import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class JiraResource {

  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  scopes: string[];

  @Field()
  avatarUrl: string;

}
