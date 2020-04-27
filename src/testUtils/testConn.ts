import { createConnection } from "typeorm";

import { User, Invoice, InvoiceItem, Log } from "../entities";

export const testConn = (drop: boolean = false) => {
  return createConnection({
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
