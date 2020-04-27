import { graphql } from "graphql";
import Maybe from "graphql/tsutils/Maybe";

import { createSchema } from "../utils";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
}

export const gCall = async ({
  source,
  variableValues
}: Options) => {
  return graphql({
    schema: await createSchema(),
    source,
    variableValues
  });
}
