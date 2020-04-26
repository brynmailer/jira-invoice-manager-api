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
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typedi_1 = require("typedi");
const entities_1 = require("../entities");
const types_1 = require("./types");
const middleware_1 = require("../middleware");
let JiraResolver = class JiraResolver {
    constructor(saltRounds, clientId, callbackUrl, userRepository) {
        this.saltRounds = saltRounds;
        this.clientId = clientId;
        this.callbackUrl = callbackUrl;
        this.userRepository = userRepository;
    }
    getAuthUrl(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return `
      https://auth.atlassian.com/authorize?
      audience=api.atlassian.com&
      client_id=${this.clientId}&
      scope=read%3Ajira-user%20read%3Ajira-work%20offline_access&
      redirect_uri=${this.callbackUrl}&
      state=${ctx.req.session.userState}&
      response_type=code&
      prompt=consent
    `
                .replace(/(\r\n|\n|\r| )/gm, "");
        });
    }
    exchangeAuthCode({ code, state }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const access = yield ctx.dataSources.jiraAuth.exchangeAuthCode(code, state, ctx.req.session.userState);
            ctx.user.refreshToken = access.refresh_token;
            this.userRepository.save(ctx.user);
            return { message: "Successfully exchanged authorization code for access token." };
        });
    }
    getAccessibleResources(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.dataSources.jiraAPI.getAccessibleResources();
        });
    }
    getProjects({ cloudId, page, pageSize }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.dataSources.jiraAPI.getProjects(cloudId, page, pageSize);
        });
    }
    getIssues({ cloudId, projectKey, page, pageSize }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.dataSources.jiraAPI.getIssues(cloudId, projectKey, page, pageSize);
        });
    }
    getWorklogs({ cloudId, issueKey, page, pageSize }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const jiraUserId = yield ctx.dataSources.jiraAPI.getUserId(cloudId);
            return ctx.dataSources.jiraAPI.getWorklogs(cloudId, issueKey, jiraUserId, page, pageSize);
        });
    }
};
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Query(returns => String),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JiraResolver.prototype, "getAuthUrl", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Mutation(returns => entities_1.Message),
    __param(0, type_graphql_1.Args()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.ExchangeAuthCodeArgs, Object]),
    __metadata("design:returntype", Promise)
], JiraResolver.prototype, "exchangeAuthCode", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Query(returns => [entities_1.JiraResource]),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JiraResolver.prototype, "getAccessibleResources", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Query(returns => [entities_1.JiraProject]),
    __param(0, type_graphql_1.Args()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.GetProjectsArgs, Object]),
    __metadata("design:returntype", Promise)
], JiraResolver.prototype, "getProjects", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Query(returns => [entities_1.JiraIssue]),
    __param(0, type_graphql_1.Args()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.GetIssuesArgs, Object]),
    __metadata("design:returntype", Promise)
], JiraResolver.prototype, "getIssues", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Query(returns => [entities_1.JiraWorklog]),
    __param(0, type_graphql_1.Args()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.GetWorklogsArgs, Object]),
    __metadata("design:returntype", Promise)
], JiraResolver.prototype, "getWorklogs", null);
JiraResolver = __decorate([
    type_graphql_1.Resolver(),
    __param(0, typedi_1.Inject("SALT_ROUNDS")),
    __param(1, typedi_1.Inject("CLIENT_ID")),
    __param(2, typedi_1.Inject("CALLBACK_URL")),
    __param(3, typeorm_typedi_extensions_1.InjectRepository(entities_1.User)),
    __metadata("design:paramtypes", [String, String, String, typeorm_1.Repository])
], JiraResolver);
exports.JiraResolver = JiraResolver;
