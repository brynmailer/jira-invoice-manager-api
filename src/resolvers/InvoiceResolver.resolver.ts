import {
  Resolver,
  Authorized,
  UseMiddleware,
  Query,
  Mutation,
  Arg,
  Ctx,
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import _ from "lodash";

import { User, Invoice, InvoiceItem, Message } from "../entities";
import { InvoiceInput } from "./types";
import { Context } from "../types";
import { LogAction } from "../middleware";

@Resolver()
export class InvoiceResolver {
  @InjectRepository(Invoice)
  private readonly invoiceRepository: Repository<Invoice>;

  @InjectRepository(InvoiceItem)
  private readonly invoiceItemRepository: Repository<InvoiceItem>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Authorized()
  @UseMiddleware(LogAction)
  @Query((returns) => Invoice, { nullable: true })
  async invoice(
    @Arg("id") invoiceId: string,
    @Ctx() ctx: Context
  ): Promise<Invoice | null> {
    return ctx.user.invoices.filter((invoice) => invoice.id === invoiceId)[0];
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Mutation((returns) => Invoice)
  async createInvoice(
    @Arg("invoice") invoiceInput: InvoiceInput,
    @Ctx() ctx: Context
  ): Promise<Invoice> {
    const invoice = this.invoiceRepository.create({
      ...invoiceInput,
      user: ctx.user,
      number: ctx.user.createdInvoices + 1,
      items: invoiceInput.itemInputs.map(
        ({ cloudId, worklogId, issueKey }) => ({
          cloudId,
          worklogId,
          issueKey,
        })
      ),
    });

    this.userRepository.update(ctx.user.id, {
      createdInvoices: ctx.user.createdInvoices + 1,
    });

    return await this.invoiceRepository.save(invoice);
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Mutation((returns) => Message)
  async deleteInvoice(@Arg("id") invoiceId: string): Promise<Message> {
    const result = await this.invoiceRepository.delete(invoiceId);
    const message =
      result.affected === 1
        ? `Successfully deleted invoice with id ${invoiceId}`
        : `Failed to delete invoice with id ${invoiceId}`;
    return { message };
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Mutation((returns) => Invoice)
  async updateInvoice(
    @Arg("id") invoiceId: string,
    @Arg("invoice") { itemInputs, ...rest }: InvoiceInput,
    @Ctx() ctx: Context
  ): Promise<Invoice> {
    const invoice = await this.invoiceRepository.findOne(invoiceId, {
      relations: ["items"],
    });

    const items = invoice.items.map(({ cloudId, issueKey, worklogId }) => ({
      cloudId,
      issueKey,
      worklogId,
    }));

    itemInputs.forEach((itemInput) => {
      if (!items.some((item) => _.isEqual(item, itemInput))) {
        this.invoiceItemRepository.insert({
          ...itemInput,
          invoice,
        });
      }
    });

    items.forEach((item, index) => {
      if (!itemInputs.some((itemInput) => _.isEqual(itemInput, item))) {
        this.invoiceItemRepository.delete(invoice.items[index].id);
      }
    });

    await this.invoiceRepository.update(invoiceId, {
      ...rest,
    });

    return await this.invoiceRepository.findOne(invoiceId, {
      relations: ["items"],
    });
  }
}
