import { InputType, Field } from "type-graphql";
import { MaxLength, Length, IsString, IsEmail } from "class-validator";

import { User } from "../../entities";

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  @MaxLength(255)
  @IsString()
  firstName: string;

  @Field()
  @MaxLength(255)
  @IsString()
  lastName: string;

  @Field()
  @Length(8, 20)
  @IsString()
  password: string;

  @Field()
  @Length(3, 255)
  @IsString()
  @IsEmail()
  email: string;
}
