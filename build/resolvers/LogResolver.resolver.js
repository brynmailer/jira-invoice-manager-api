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
const types_1 = require("./types");
const entities_1 = require("../entities");
let LogResolver = class LogResolver {
    logs({ page, pageSize }) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.logRepository
                .createQueryBuilder("log")
                .orderBy("log.timestamp", "DESC")
                .skip(page * pageSize)
                .take(pageSize)
                .getMany();
        });
    }
};
__decorate([
    typeorm_typedi_extensions_1.InjectRepository(entities_1.Log),
    __metadata("design:type", typeorm_1.Repository)
], LogResolver.prototype, "logRepository", void 0);
__decorate([
    type_graphql_1.Authorized("ADMIN"),
    type_graphql_1.Query((returns) => [entities_1.Log]),
    __param(0, type_graphql_1.Args()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.PaginationArgs]),
    __metadata("design:returntype", Promise)
], LogResolver.prototype, "logs", null);
LogResolver = __decorate([
    type_graphql_1.Resolver()
], LogResolver);
exports.LogResolver = LogResolver;
