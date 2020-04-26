import { ArgsType, Field } from "type-graphql";
import { IsString } from "class-validator";

import { PaginationArgs } from "./PaginationArgs";

@ArgsType()
export class GetWorklogsArgs extends PaginationArgs {

  @Field()
  @IsString()
  cloudId: string;

  @Field()
  @IsString()
  issueKey: string;

}
