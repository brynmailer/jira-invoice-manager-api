import { Connection, getRepository, Repository } from "typeorm";

import { setup, gCall } from "../testUtils";
import { User } from "../entities";

let conn: Connection;
let userRepository: Repository<User>;

beforeAll(async () => {
  conn = await setup(true);
  userRepository = getRepository(User);
});

afterAll(async () => {
  conn.close();
});

describe("User actions", () => {
  test("Register user", async () => {
    const result = await gCall({
      source: `
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
            invoices {
              id
            }
          }
        }
      `,
      contextValue: {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test user-agent field",
          },
        },
      },
      variableValues: {
        user: {
          firstName: "test",
          lastName: "test",
          email: "test@test.com",
          password: "testpassword",
        },
      },
    });
    console.log(result);

    expect(result).toMatchObject({
      data: {
        register: {
          firstName: "test",
          lastName: "test",
          email: "test@test.com",
          invoices: null,
        },
      },
    });
  });

  test("Logout", async () => {
    const result = await gCall({
      source: `
        mutation Logout {
          logout {
            message
          }
        }
      `,
      contextValue: {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test user-agent field",
          },
          session: {
            userId: "test",
            destroy: (func) => {
              func();
            },
          },
          sessionID: "test",
        },
      },
    });

    expect(result).toMatchObject({
      data: {
        logout: {
          message: "Successfully logged out.",
        },
      },
    });
  });

  test("Login as new user", async () => {
    const result = await gCall({
      source: `
        mutation Login(
          $email: String!,
          $password: String!
        ) {
          login(
            email: $email,
            password: $password
          ) {
            id
            firstName
            lastName
            email
            invoices {
              id
            }
          }
        }
      `,
      contextValue: {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test user-agent field",
          },
          session: {},
          sessionID: "test",
        },
      },
      variableValues: {
        email: "test@test.com",
        password: "testpassword",
      },
    });

    expect(result).toMatchObject({
      data: {
        login: {
          firstName: "test",
          lastName: "test",
          email: "test@test.com",
          invoices: null,
        },
      },
    });
  });

  test("Retrieve currently logged in user", async () => {
    const result = await gCall({
      source: `
        query CurrentUser {
          currentUser {
            id
            firstName
            lastName
            email
            invoices {
              id
              items {
                id
              }
            }
          }
        }
      `,
      contextValue: {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test user-agent field",
          },
          session: {
            userId: "test",
          },
          sessionID: "test",
        },
        user: await userRepository.findOne({ firstName: "test" }),
      },
    });

    expect(result).toMatchObject({
      data: {
        currentUser: {
          firstName: "test",
          lastName: "test",
          email: "test@test.com",
          invoices: null,
        },
      },
    });
  });

  test("Logout", async () => {
    const result = await gCall({
      source: `
        mutation Logout {
          logout {
            message
          }
        }
      `,
      contextValue: {
        req: {
          ip: "127.0.0.1",
          headers: {
            "user-agent": "test user-agent field",
          },
          session: {
            userId: "test",
            destroy: (func) => {
              func();
            },
          },
          sessionID: "test",
        },
      },
    });

    expect(result).toMatchObject({
      data: {
        logout: {
          message: "Successfully logged out.",
        },
      },
    });
  });
});
