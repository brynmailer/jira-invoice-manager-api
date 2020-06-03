import { AuthChecker } from "type-graphql";

import { Context } from "../types";

export const authChecker: AuthChecker<Context> = (
  { context: { user } },
  roles
) => {
  if (user) {
    return roles.includes(user.role);
  }
  return false;
};
