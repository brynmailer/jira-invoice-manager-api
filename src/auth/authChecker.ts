import { AuthChecker } from "type-graphql";

import { Context } from "../types";

export const authChecker: AuthChecker<Context> = (
  { context: { user } },
  roles
) => {
  if (user) {
    if (roles.length > 0) return roles.includes(user.role);
    return true;
  }
  return false;
};
