import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import { Container } from "typedi";
import {
  useContainer,
  createConnection,
  ConnectionOptions,
  getRepository,
} from "typeorm";
import Redis from "ioredis";
import Express from "express";
import MySQLSession from "express-mysql-session";
import { CorsOptions } from "cors";
// Couldn't get default import to work
// due to the way the express-session
// exports session
const session = require("express-session");

import { User, Invoice, InvoiceItem, Log } from "./entities";
import { JiraAuth, JiraAPI } from "./dataSources";
import { createSchema } from "./utils";

// Setting some global variables in the IoC container
Container.set("SALT_ROUNDS", 10);
Container.set("CLIENT_ID", "2Rms1ySSrAYQ4oLjbtfbdfYX2gIrMmX4");
Container.set(
  "CLIENT_SECRET",
  "jdht9YEXnt7WLybCjNJyjcRAbflUSE9hVrI4GfCPF8h_sldmUKcYwR-lPlgq0em4"
);
Container.set("CALLBACK_URL", "http://localhost:3000");
Container.set("REDIS_CLIENT", new Redis());

// DB Config
const DB_CONFIG = {
  host: "localhost",
  port: 3306,
  username: "webservice",
  password: "administrator",
  database: "jira-invoice-manager",
};

const main = async () => {
  try {
    // Allow TypeORM to use IoC container for DI.
    // This means that a singleton of the DB connection will be accessible
    // throughout the application.
    useContainer(Container);

    // Initialise the connection to the database
    await createConnection({
      ...DB_CONFIG,
      type: "mysql",
      entities: [User, Invoice, InvoiceItem, Log],
      synchronize: true,
    } as ConnectionOptions);

    const schema = await createSchema();

    const server = new ApolloServer({
      schema,
      dataSources: () => {
        return {
          jiraAuth: Container.get(JiraAuth),
          jiraAPI: Container.get(JiraAPI),
        };
      },
      context: async ({ req }) => {
        const userRepository = getRepository(User);

        // If there is a session set, attach the appropriate user from
        // the DB to the context.
        if (req.session.userId) {
          return {
            req,
            user: await userRepository.findOne({
              relations: ["invoices", "invoices.items"],
              where: { user: { id: req.session.userId } },
            }),
          };
        }

        // Otherwise only return the express Request object.
        return { req };
      },
      playground: true,
    });

    const app = Express();

    const MySQLStore = MySQLSession(session);

    const corsOptions: CorsOptions = {
      origin: "http://localhost:3000",
      credentials: true,
    };

    app.use(
      session({
        store: new MySQLStore({
          user: DB_CONFIG.username,
          password: DB_CONFIG.password,
          database: DB_CONFIG.database,
          host: DB_CONFIG.host,
          port: DB_CONFIG.port,
          checkExpirationInterval: 1000 * 2,
        }),
        secret: "lj2b12jnmv3242234ioj2",
        resave: false,
        saveUninitialized: false,
        cookie: {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          // 4 week session life
          maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
        },
      })
    );

    server.applyMiddleware({ app, cors: corsOptions });

    app.listen(3001, () => {
      console.log("GraphQL API available at http://localhost:3001/graphql");
    });
  } catch (err) {
    console.log(err);
  }
};

main();
