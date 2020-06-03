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

import { PaginationArgs } from "./types";
import { Log } from "../entities";

@Resolver()
export class LogResolver {
  @InjectRepository(Log)
  private readonly logRepository: Repository<Log>;

  @Authorized("ADMIN")
  @Query((returns) => [Log])
  async logs(@Args() { page, pageSize }: PaginationArgs): Promise<Log[]> {
    return await this.logRepository
      .createQueryBuilder("log")
      .orderBy("log.timestamp", "DESC")
      .skip(page * pageSize)
      .take(pageSize)
      .getMany();
  }
}
