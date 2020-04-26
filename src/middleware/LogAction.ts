import { MiddlewareFn } from "type-graphql";
import { getRepository } from "typeorm";

import { Log } from "../entities";
import { Context } from "../types";

export const LogAction: MiddlewareFn<Context> = async ({ context, info }, next) => {
  const logRespository = getRepository(Log);

  const log = logRespository.create({
    ip: context.req.ip,
    userAgent: context.req.headers["user-agent"],
    timestamp: new Date().toString(),
    action: info.fieldName
  });

  await logRespository.save(log);

  return next();
};
