import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Inject } from "typedi";
import { Redis } from "ioredis";

import {
  JiraResource,
  JiraProject,
  JiraIssue,
  JiraWorklog,
  JiraAvatar,
} from "../entities";
import { Context } from "../types";

export class JiraAPI extends RESTDataSource {
  context: Context;

  constructor(@Inject("REDIS_CLIENT") private readonly redis: Redis) {
    super();
    this.baseURL = "https://api.atlassian.com/";
  }

  async willSendRequest(req: RequestOptions) {
    let accessToken = await this.redis.get(this.context.user.id);
    if (accessToken) {
      req.headers.set("Authorization", "Bearer " + accessToken);
    } else {
      console.log("refreshing access token...");
      await this.context.dataSources.jiraAuth.refreshAccessToken(
        this.context.user.refreshToken
      );

      accessToken = await this.redis.get(this.context.user.id);

      req.headers.set("Authorization", "Bearer " + accessToken);
    }
  }

  async getAccessibleResources(): Promise<JiraResource[]> {
    return await this.get("oauth/token/accessible-resources");
  }

  async getProjects(
    cloudId: string,
    page: number,
    pageSize: number
  ): Promise<JiraProject[]> {
    const response = await this.get(
      `ex/jira/${cloudId}/rest/api/3/project/search?startAt=${
        page * pageSize
      }&maxResults=${pageSize}`
    );
    return response.values.map(
      (project) =>
        ({
          self: project.self,
          id: project.id,
          key: project.key,
          name: project.name,
          avatarUrls: Object.keys(project.avatarUrls).map(
            (avatarResolution) =>
              ({
                resolution: avatarResolution,
                url: project.avatarUrls[avatarResolution],
              } as JiraAvatar)
          ),
        } as JiraProject)
    );
  }

  async getIssues(
    cloudId: string,
    projectKey: string,
    page: number,
    pageSize: number
  ): Promise<JiraIssue[]> {
    const response = await this.get(
      `ex/jira/${cloudId}/rest/api/3/search?jql=project=${projectKey}&fields=summary&startAt=${
        page * pageSize
      }&maxResults=${pageSize}`
    );
    return response.issues.map(
      (issue) =>
        ({
          self: issue.self,
          id: issue.id,
          key: issue.key,
          summary: issue.fields.summary,
        } as JiraIssue)
    );
  }

  async getWorklogs(
    cloudId: string,
    issueKey: string,
    userId: string,
    page: number,
    pageSize: number
  ): Promise<JiraWorklog[]> {
    const response = await this.get(
      `ex/jira/${cloudId}/rest/api/3/issue/${issueKey}/worklog`
    );
    const worklogs = response.worklogs.map((worklog) => {
      if (userId === worklog.author.accountId)
        return {
          self: worklog.self,
          id: worklog.id,
          timeSpentSeconds: worklog.timeSpentSeconds,
          started: new Date(worklog.started),
        } as JiraWorklog;
    });
    return worklogs.slice(page * pageSize, page * pageSize + pageSize);
  }

  async getUserId(cloudId: string): Promise<string> {
    const response = await this.get(`ex/jira/${cloudId}/rest/api/3/myself`);
    return response.accountId;
  }
}
