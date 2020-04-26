import { ArgsType, Field, ID } from "type-graphql";
import { IsString } from "class-validator";

import { PaginationArgs } from "./PaginationArgs";

@ArgsType()
export class GetProjectsArgs extends PaginationArgs {

  @Field(type => ID)
  @IsString()
  cloudId: string;

}
