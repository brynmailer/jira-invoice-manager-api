import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class JiraAvatar {
  @Field()
  resolution: string;

  @Field()
  url: string;
}
