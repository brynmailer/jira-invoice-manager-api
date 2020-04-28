import { createConnection } from "typeorm";
import { Container } from "typedi";
import { useContainer } from "typeorm";

import { User, Invoice, InvoiceItem, Log } from "../entities";

export const testConn = (drop: boolean = false) => {
  useContainer(Container);

  Container.set("SALT_ROUNDS", 10);

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
