import { Request } from "express";

import { DataSources } from "./DataSources";
import { User } from "../entities";

export interface Context {
  req: Request;
  dataSources: DataSources;
  user?: User;
  rateLimited: boolean;
}
