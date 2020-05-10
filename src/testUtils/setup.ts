import { createConnection } from "typeorm";
import { Container } from "typedi";
import { useContainer } from "typeorm";
import Redis from "ioredis";

import { User, Invoice, InvoiceItem, Log } from "../entities";

export const setup = async (drop: boolean = false) => {
  useContainer(Container);

  Container.set("SALT_ROUNDS", 10);

  const redisClient = new Redis();
  await redisClient.select(1);
  await redisClient.flushdb();

  Container.set("REDIS_CLIENT", redisClient);

  return createConnection({
    name: "default",
    host: "localhost",
    port: 3306,
    username: "webservice",
    password: "administrator",
    database: "jira-invoice-manager-test",
    type: "mysql",
    entities: [ User, Invoice, InvoiceItem, Log ],
    synchronize: drop,
    dropSchema: drop
  });
}
