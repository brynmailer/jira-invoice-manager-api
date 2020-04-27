import { Connection } from "typeorm";

import { testConn } from "../testUtils/testConn";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  conn.close();
});

describe('Register', () => {
  it("create user", () => {

  });
});
