"use strict";
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
const typedi_1 = require("typedi");
const type_graphql_1 = require("type-graphql");
const auth_1 = require("../auth");
const middleware_1 = require("../middleware");
const resolvers_1 = require("../resolvers");
exports.createSchema = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield type_graphql_1.buildSchema({
        resolvers: [resolvers_1.InvoiceResolver, resolvers_1.JiraResolver, resolvers_1.UserResolver],
        authChecker: auth_1.authChecker,
        container: typedi_1.Container,
        globalMiddlewares: [middleware_1.RateLimitDaily],
    });
});
