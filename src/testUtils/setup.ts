import "reflect-metadata";
import { Container } from "typedi";

import { testConn } from "./testConn";

const setup = () => {
  testConn(true).then(() => process.exit());
}

setup();
