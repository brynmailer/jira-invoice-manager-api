import { ArgsType, Field, Int } from "type-graphql";
import { IsInt, IsNumber, IsPositive, Min } from "class-validator";

@ArgsType()
export abstract class PaginationArgs {

  @Field(type => Int, { defaultValue: 0 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsInt()
  @Min(0)
  page: number;

  @Field(type => Int, { defaultValue: 50 })
  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsInt()
  @Min(1)
  pageSize: number;

}
