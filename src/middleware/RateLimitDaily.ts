import { MiddlewareFn, NextFn } from "type-graphql";
import { Container } from "typedi";
import { Redis } from "ioredis";

import { Context } from "../types";

export const RateLimitDaily: MiddlewareFn<Context> = async (
  { context },
  next: NextFn
) => {
  // Get the instance of the Redis client created in src/index.ts
  const redis: Redis = Container.get("REDIS_CLIENT");

  // Create the key that links the number of requests to the users IP
  const key = `rate-limit-daily:${context.req.ip}`;

  // Increments the request count stored at the predetermined key by one.
  // If the key does not exist, it is set to 0 before it is incremented
  const current = await redis.incr(key);

  // If the number of requests is greater than the daily limit
  // throw an error back to the user.
  // Otherwise, if this is the first request of the day set the
  // key to expire 1 day from creation.
  if (current > 1000) {
    throw new Error("Daily maximum number of requests exceeded.");
  } else if (current === 1) {
    await redis.expire(key, 60 * 60 * 24);
  }

  // Proceed to the next middleware/resolver function
  return next();
};
