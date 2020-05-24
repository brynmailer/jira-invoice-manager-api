import { ObjectType, Field, ID } from "type-graphql";

import { JiraAvatar } from "./";

@ObjectType()
export class JiraProject {
  @Field((type) => ID)
  id: number;

  @Field()
  self: string;

  @Field()
  key: string;

  @Field()
  name: string;

  @Field((type) => [JiraAvatar])
  avatarUrls: JiraAvatar[];
}
