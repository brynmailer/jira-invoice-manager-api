import { MiddlewareFn, NextFn } from "type-graphql";
import { Container } from "typedi";
import { Redis } from "ioredis";

import { Context } from "../types";

export const RateLimitDaily: MiddlewareFn<Context> = async (
  { context, info },
  next: NextFn
) => {
  const redis: Redis = Container.get("REDIS_CLIENT");

  const key = `rate-limit-daily:${context.req.ip}`;

  const current = await redis.incr(key);

  if (current > 1000) {
    throw new Error("Daily maximum number of requests exceeded.");
  } else if (current === 1) {
    await redis.expire(key, 60 * 60 * 24);
  }

  return next();
};
