import { MiddlewareFn, NextFn } from "type-graphql";

import { Context } from "../types";

export const RateLimitPerSecond: MiddlewareFn<Context> = async (
  { context, info },
  next: NextFn
) => {
  // I have no idea how to do this
  return next();
};
