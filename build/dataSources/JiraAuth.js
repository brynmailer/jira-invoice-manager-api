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
const apollo_server_express_1 = require("apollo-server-express");
const apollo_datasource_rest_1 = require("apollo-datasource-rest");
const typedi_1 = require("typedi");
let JiraAuth = class JiraAuth extends apollo_datasource_rest_1.RESTDataSource {
    constructor(clientId, clientSecret, callbackUrl, redis) {
        super();
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.callbackUrl = callbackUrl;
        this.redis = redis;
        this.baseURL = "https://auth.atlassian.com/oauth/token";
    }
    refreshAccessToken(refreshToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const access = yield this.post("/", {
                grant_type: "refresh_token",
                client_id: this.clientId,
                client_secret: this.clientSecret,
                refresh_token: refreshToken,
            });
            yield this.redis.set(this.context.user.id, access.access_token, "EX", access.expires_in);
            return access;
        });
    }
    exchangeAuthCode(code, callbackState, userState) {
        return __awaiter(this, void 0, void 0, function* () {
            if (decodeURIComponent(callbackState) !== userState)
                throw new apollo_server_express_1.ForbiddenError("Invalid state");
            const access = yield this.post("/", {
                grant_type: "authorization_code",
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: code,
                redirect_uri: this.callbackUrl,
            });
            yield this.redis.set(this.context.user.id, access.access_token, "EX", access.expires_in);
            return access;
        });
    }
};
JiraAuth = __decorate([
    __param(0, typedi_1.Inject("CLIENT_ID")),
    __param(1, typedi_1.Inject("CLIENT_SECRET")),
    __param(2, typedi_1.Inject("CALLBACK_URL")),
    __param(3, typedi_1.Inject("REDIS_CLIENT")),
    __metadata("design:paramtypes", [String, String, String, Object])
], JiraAuth);
exports.JiraAuth = JiraAuth;
