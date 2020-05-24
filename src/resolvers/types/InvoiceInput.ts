import { InputType, Field, Float } from "type-graphql";
import {
  MaxLength,
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
} from "class-validator";

import { Invoice } from "../../entities";

@InputType()
export class InvoiceInput implements Partial<Invoice> {
  @Field()
  @IsDateString()
  issued: string;

  @Field()
  @MaxLength(255)
  @IsString()
  status: string;

  @Field()
  @MaxLength(255)
  @IsString()
  businessName: string;

  @Field()
  @MaxLength(255)
  @IsString()
  billTo: string;

  @Field((type) => Float)
  @IsNumber()
  @IsPositive()
  ratePerHour: number;

  @Field((type) => Float)
  @IsNumber()
  @IsPositive()
  total: number;

  @Field()
  @IsDateString()
  due: string;

  @Field((type) => [String])
  itemUrls: string[];
}
