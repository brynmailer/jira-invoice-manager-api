import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
export class JiraIssue {

  @Field(type => ID)
  id: number;

  @Field()
  self: string;

  @Field()
  key: string;

  @Field()
  summary: string;

}
