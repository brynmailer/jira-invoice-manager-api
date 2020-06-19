import {
  Resolver,
  Authorized,
  UseMiddleware,
  Query,
  Mutation,
  Args,
  Arg,
  Ctx,
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { User, Invoice, InvoiceItem } from "../entities";
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

  /*
  // NOTE: must find a way to update an invoices items and remove
  // all items that are no longer part of the invoice
  // whilst also preserving the id of the invoice.
  @Authorized()
  @UseMiddleware(LogAction)
  @Mutation((returns) => Invoice)
  async updateInvoice(
    @Arg("id") invoiceId: string,
    @Arg("invoice") invoiceInput: InvoiceInput,
    @Ctx() ctx: Context
  ): Promise<Invoice> {
    const { number } = ctx.user.invoices[ctx.user.invoices.length - 1];

    await this.invoiceRepository.delete(invoiceId);

    const invoice = this.invoiceRepository.create({
      ...invoiceInput,
      user: ctx.user,
      number,
      items: invoiceInput.itemUrls.map((itemUrl) => ({
        jiraId: itemUrl.split("/")[itemUrl.split("/").length - 1],
        issueId: itemUrl.split("/")[itemUrl.split("/").length - 3],
      })),
    });

    return await this.invoiceRepository.save(invoice);
  }
  */
}
