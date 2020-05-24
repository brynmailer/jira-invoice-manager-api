import { ForbiddenError } from "apollo-server-express";
import { RESTDataSource } from "apollo-datasource-rest";
import { Inject } from "typedi";
import { Redis } from "ioredis";

import { JiraAccess } from "./types";

export class JiraAuth extends RESTDataSource {
  constructor(
    @Inject("CLIENT_ID") private readonly clientId: string,
    @Inject("CLIENT_SECRET") private readonly clientSecret: string,
    @Inject("CALLBACK_URL") private readonly callbackUrl: string,
    @Inject("REDIS_CLIENT") private readonly redis: Redis
  ) {
    super();
    this.baseURL = "https://auth.atlassian.com/oauth/token";
  }

  async refreshAccessToken(refreshToken: string): Promise<JiraAccess> {
    const access = await this.post("/", {
      grant_type: "refresh_token",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      refresh_token: refreshToken,
    });

    await this.redis.set(
      this.context.user.id,
      access.access_token,
      "EX",
      access.expires_in
    );

    return access;
  }

  async exchangeAuthCode(
    code: string,
    callbackState: string,
    userState: string
  ): Promise<JiraAccess> {
    if (decodeURIComponent(callbackState) !== userState)
      throw new ForbiddenError("Invalid state");

    const access = await this.post("/", {
      grant_type: "authorization_code",
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code: code,
      redirect_uri: this.callbackUrl,
    });

    await this.redis.set(
      this.context.user.id,
      access.access_token,
      "EX",
      access.expires_in
    );

    return access;
  }
}
