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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const typedi_1 = require("typedi");
const typeorm_2 = require("typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const entities_1 = require("../entities");
exports.setup = (drop = false) => __awaiter(void 0, void 0, void 0, function* () {
    typeorm_2.useContainer(typedi_1.Container);
    typedi_1.Container.set("SALT_ROUNDS", 10);
    const redisClient = new ioredis_1.default();
    yield redisClient.select(1);
    yield redisClient.flushdb();
    typedi_1.Container.set("REDIS_CLIENT", redisClient);
    return typeorm_1.createConnection({
        name: "default",
        host: "localhost",
        port: 3306,
        username: "webservice",
        password: "administrator",
        database: "jira-invoice-manager-test",
        type: "mysql",
        entities: [entities_1.User, entities_1.Invoice, entities_1.InvoiceItem, entities_1.Log],
        synchronize: drop,
        dropSchema: drop,
    });
});
