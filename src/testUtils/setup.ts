import { graphql } from "graphql";
import { buildSchema } from "type-graphql";
import { Container } from "typedi";
import { useContainer } from "typeorm";
import Redis from "ioredis";

import { testConn } from "./testConn";

// Allow TypeORM to use IoC container for DI.
// This facilitates the ability to share the database connection
// with other parts of the application
useContainer(Container);

// Setting some global variables in the IoC container
Container.set("SALT_ROUNDS", 10);
Container.set("CLIENT_ID", "2Rms1ySSrAYQ4oLjbtfbdfYX2gIrMmX4");
Container.set("CLIENT_SECRET", "jdht9YEXnt7WLybCjNJyjcRAbflUSE9hVrI4GfCPF8h_sldmUKcYwR-lPlgq0em4");
Container.set("CALLBACK_URL", "http://localhost:3000");
Container.set("REDIS_CLIENT", new Redis());

testConn(true).then(() => process.exit());
