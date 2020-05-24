import { Container } from "typedi";
import { buildSchema } from "type-graphql";

import { authChecker } from "../auth";
import { RateLimitDaily, RateLimitPerSecond } from "../middleware";
import { InvoiceResolver, JiraResolver, UserResolver } from "../resolvers";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [InvoiceResolver, JiraResolver, UserResolver],
    authChecker,
    container: Container,
    globalMiddlewares: [RateLimitDaily, RateLimitPerSecond],
  });
};
