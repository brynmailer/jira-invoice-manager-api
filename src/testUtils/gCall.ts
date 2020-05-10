import { graphql, GraphQLSchema } from "graphql";
import Maybe from "graphql/tsutils/Maybe";

import { createSchema } from "../utils";

interface Options {
  source: string;
  variableValues?: Maybe<{
    [key: string]: any;
  }>;
  contextValue?: Maybe<{
    [key: string]: any;
  }>;
}

let schema: GraphQLSchema;

export const gCall = async ({
  source,
  variableValues,
  contextValue
}: Options) => {
  if (!schema) schema = await createSchema();
  return graphql({
    schema,
    source,
    variableValues,
    contextValue
  });
}
