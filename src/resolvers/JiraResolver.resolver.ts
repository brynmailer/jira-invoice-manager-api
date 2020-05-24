import {
  Resolver,
  Authorized,
  UseMiddleware,
  Query,
  Mutation,
  Args,
  Ctx,
} from "type-graphql";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Inject } from "typedi";
import * as bcrypt from "bcrypt";

import {
  User,
  Message,
  JiraResource,
  JiraProject,
  JiraIssue,
  JiraWorklog,
} from "../entities";
import {
  GetProjectsArgs,
  GetIssuesArgs,
  GetWorklogsArgs,
  ExchangeAuthCodeArgs,
} from "./types";
import { Context } from "../types";
import { LogAction } from "../middleware";

@Resolver()
export class JiraResolver {
  @Inject("SALT_ROUNDS")
  private readonly saltRounds: string;

  @Inject("CLIENT_ID")
  private readonly clientId: string;

  @Inject("CALLBACK_URL")
  private readonly callbackUrl: string;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

  @Authorized()
  @UseMiddleware(LogAction)
  @Query((returns) => String)
  async getAuthUrl(@Ctx() ctx: Context): Promise<String> {
    return `
      https://auth.atlassian.com/authorize?
      audience=api.atlassian.com&
      client_id=${this.clientId}&
      scope=read%3Ajira-user%20read%3Ajira-work%20offline_access&
      redirect_uri=${this.callbackUrl}&
      state=${ctx.req.session.userState}&
      response_type=code&
      prompt=consent
    `.replace(/(\r\n|\n|\r| )/gm, "");
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Mutation((returns) => Message)
  async exchangeAuthCode(
    @Args() { code, state }: ExchangeAuthCodeArgs,
    @Ctx() ctx: Context
  ): Promise<Message> {
    const access = await ctx.dataSources.jiraAuth.exchangeAuthCode(
      code,
      state,
      ctx.req.session.userState
    );

    ctx.user.refreshToken = access.refresh_token;

    this.userRepository.save(ctx.user);

    return {
      message: "Successfully exchanged authorization code for access token.",
    };
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Query((returns) => [JiraResource])
  async getAccessibleResources(@Ctx() ctx: Context): Promise<JiraResource[]> {
    return ctx.dataSources.jiraAPI.getAccessibleResources();
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Query((returns) => [JiraProject])
  async getProjects(
    @Args() { cloudId, page, pageSize }: GetProjectsArgs,
    @Ctx() ctx: Context
  ): Promise<JiraProject[]> {
    return ctx.dataSources.jiraAPI.getProjects(cloudId, page, pageSize);
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Query((returns) => [JiraIssue])
  async getIssues(
    @Args() { cloudId, projectKey, page, pageSize }: GetIssuesArgs,
    @Ctx() ctx: Context
  ): Promise<JiraIssue[]> {
    return ctx.dataSources.jiraAPI.getIssues(
      cloudId,
      projectKey,
      page,
      pageSize
    );
  }

  @Authorized()
  @UseMiddleware(LogAction)
  @Query((returns) => [JiraWorklog])
  async getWorklogs(
    @Args() { cloudId, issueKey, page, pageSize }: GetWorklogsArgs,
    @Ctx() ctx: Context
  ): Promise<JiraWorklog[]> {
    const jiraUserId = await ctx.dataSources.jiraAPI.getUserId(cloudId);
    return ctx.dataSources.jiraAPI.getWorklogs(
      cloudId,
      issueKey,
      jiraUserId,
      page,
      pageSize
    );
  }
}
