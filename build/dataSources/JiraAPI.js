"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const typedi_1 = require("typedi");
let JiraAPI = class JiraAPI extends apollo_datasource_rest_1.RESTDataSource {
    constructor(redis) {
        super();
        this.redis = redis;
        this.baseURL = "https://api.atlassian.com/";
    }
    willSendRequest(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let accessToken = this.redis.get(this.context.user.id);
            if (accessToken) {
                req.headers.set("Authorization", "Bearer " + accessToken);
            }
            else {
                console.log("refreshing access token...");
                yield this.context.dataSources.jiraAuth.refreshAccessToken(this.context.user.refreshToken);
                accessToken = this.redis.get(this.context.user.id);
                req.headers.set("Authorization", "Bearer " + accessToken);
            }
        });
    }
    getAccessibleResources() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.get("oauth/token/accessible-resources");
        });
    }
    getProjects(cloudId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`ex/jira/${cloudId}/rest/api/3/project/search?startAt=${page * pageSize}&maxResults=${pageSize}`);
            return response.values.map(project => ({
                self: project.self,
                id: project.id,
                key: project.key,
                name: project.name,
                avatarUrls: Object.keys(project.avatarUrls).map(avatarResolution => ({
                    resolution: avatarResolution,
                    url: project.avatarUrls[avatarResolution]
                }))
            }));
        });
    }
    getIssues(cloudId, projectKey, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`ex/jira/${cloudId}/rest/api/3/search?jql=project=${projectKey}&fields=summary&startAt=${page * pageSize}&maxResults=${pageSize}`);
            return response.issues.map(issue => ({
                self: issue.self,
                id: issue.id,
                key: issue.key,
                summary: issue.fields.summary
            }));
        });
    }
    getWorklogs(cloudId, issueKey, userId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`ex/jira/${cloudId}/rest/api/3/issue/${issueKey}/worklog`);
            const worklogs = response.worklogs.map(worklog => {
                if (userId === worklog.author.accountId)
                    return {
                        self: worklog.self,
                        id: worklog.id,
                        timeSpentSeconds: worklog.timeSpentSeconds,
                        started: new Date(worklog.started)
                    };
            });
            return worklogs.slice(page * pageSize, (page * pageSize) + pageSize);
        });
    }
    getUserId(cloudId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.get(`ex/jira/${cloudId}/rest/api/3/myself`);
            return response.accountId;
        });
    }
};
JiraAPI = __decorate([
    __param(0, typedi_1.Inject("REDIS_CLIENT")),
    __metadata("design:paramtypes", [Object])
], JiraAPI);
exports.JiraAPI = JiraAPI;
