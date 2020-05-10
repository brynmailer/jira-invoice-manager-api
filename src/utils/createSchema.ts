import { Container } from "typedi";
import { buildSchema } from "type-graphql";

import { authChecker } from "../auth";
import { RateLimitDaily, RateLimitPerSecond } from "../middleware";

export const createSchema = async () => {
  return await buildSchema({
    resolvers: [ __dirname + "/../resolvers/*.resolver.ts" ],
    authChecker,
    container: Container,
    globalMiddlewares: [ RateLimitDaily, RateLimitPerSecond ]
  });
};
