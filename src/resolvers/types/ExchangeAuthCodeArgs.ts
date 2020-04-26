import { ArgsType, Field, ID, Int } from "type-graphql";
import { IsString } from "class-validator";

@ArgsType()
export class ExchangeAuthCodeArgs {

  @Field()
  @IsString()
  code: string;

  @Field()
  @IsString()
  state: string;

}
