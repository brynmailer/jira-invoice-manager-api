import { ObjectType, Field, ID, Int } from "type-graphql";

@ObjectType()
export class JiraWorklog {
  @Field((type) => ID)
  id: string;

  @Field()
  self: string;

  @Field((type) => Int)
  timeSpentSeconds: number;

  @Field()
  started: Date;
}
