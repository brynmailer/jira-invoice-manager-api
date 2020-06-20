import { ArgsType, Field } from "type-graphql";
import { IsString } from "class-validator";

import { PaginationArgs } from "./PaginationArgs";

@ArgsType()
export class GetWorklogArgs extends PaginationArgs {
  @Field()
  @IsString()
  cloudId: string;

  @Field()
  @IsString()
  issueKey: string;

  @Field()
  @IsString()
  worklogId: string;
}
