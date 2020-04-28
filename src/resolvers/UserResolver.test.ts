import { Connection } from "typeorm";

import { testConn, gCall } from "../testUtils";

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  conn.close();
});

const registerMutation = `
mutation Register(
  $user: UserInput!
) {
  register(
    user: $user
  ) {
    id
    firstName
    lastName
    email
  }
}
`

describe('Register', () => {
  it("create user", async () => {
    console.log(await gCall({
      source: registerMutation,
      variableValues: {
        user: {
          firstName: "test",
          lastName: "test",
          email: "test@test.com",
          password: "testpassword"
        }
      },
      contextValue: {
        dataSources: {

        }
      }
    }));
  });
});
