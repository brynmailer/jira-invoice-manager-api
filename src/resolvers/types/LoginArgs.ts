import { ArgsType, Field, ID, Int } from "type-graphql";
import { MaxLength, Length, IsString, IsEmail } from "class-validator";

@ArgsType()
export class LoginArgs {
  @Field()
  @IsString()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
