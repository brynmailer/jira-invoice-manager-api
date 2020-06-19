import { InputType, Field } from "type-graphql";
import { IsString } from "class-validator";

import { InvoiceItem } from "../../entities";

@InputType()
export class InvoiceItemInput implements Partial<InvoiceItem> {
  @Field()
  @IsString()
  cloudId: string;

  @Field()
  @IsString()
  worklogId: string;

  @Field()
  @IsString()
  issueKey: string;
}
