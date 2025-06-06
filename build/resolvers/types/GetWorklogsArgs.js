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
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const class_validator_1 = require("class-validator");
const PaginationArgs_1 = require("./PaginationArgs");
let GetWorklogsArgs = class GetWorklogsArgs extends PaginationArgs_1.PaginationArgs {
};
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetWorklogsArgs.prototype, "cloudId", void 0);
__decorate([
    type_graphql_1.Field(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], GetWorklogsArgs.prototype, "issueKey", void 0);
GetWorklogsArgs = __decorate([
    type_graphql_1.ArgsType()
], GetWorklogsArgs);
exports.GetWorklogsArgs = GetWorklogsArgs;
