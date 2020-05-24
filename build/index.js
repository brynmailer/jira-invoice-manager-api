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
require("reflect-metadata");
const apollo_server_express_1 = require("apollo-server-express");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const ioredis_1 = __importDefault(require("ioredis"));
const express_1 = __importDefault(require("express"));
const express_mysql_session_1 = __importDefault(require("express-mysql-session"));
const session = require("express-session");
const entities_1 = require("./entities");
const dataSources_1 = require("./dataSources");
const utils_1 = require("./utils");
typedi_1.Container.set("SALT_ROUNDS", 10);
typedi_1.Container.set("CLIENT_ID", "2Rms1ySSrAYQ4oLjbtfbdfYX2gIrMmX4");
typedi_1.Container.set("CLIENT_SECRET", "jdht9YEXnt7WLybCjNJyjcRAbflUSE9hVrI4GfCPF8h_sldmUKcYwR-lPlgq0em4");
typedi_1.Container.set("CALLBACK_URL", "http://localhost:3000");
typedi_1.Container.set("REDIS_CLIENT", new ioredis_1.default());
const DB_CONFIG = {
    host: "localhost",
    port: 3306,
    username: "webservice",
    password: "administrator",
    database: "jira-invoice-manager",
};
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        typeorm_1.useContainer(typedi_1.Container);
        yield typeorm_1.createConnection(Object.assign(Object.assign({}, DB_CONFIG), { type: "mysql", entities: [entities_1.User, entities_1.Invoice, entities_1.InvoiceItem, entities_1.Log], synchronize: true }));
        const schema = yield utils_1.createSchema();
        const server = new apollo_server_express_1.ApolloServer({
            schema,
            dataSources: () => {
                return {
                    jiraAuth: typedi_1.Container.get(dataSources_1.JiraAuth),
                    jiraAPI: typedi_1.Container.get(dataSources_1.JiraAPI),
                };
            },
            context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
                const userRepository = typeorm_1.getRepository(entities_1.User);
                if (req.session.userId) {
                    return {
                        req,
                        user: yield userRepository.findOne({
                            relations: ["invoices", "invoices.items"],
                            where: { user: { id: req.session.userId } },
                        }),
                    };
                }
                return { req };
            }),
            playground: true,
        });
        const app = express_1.default();
        const MySQLStore = express_mysql_session_1.default(session);
        const corsOptions = {
            origin: "http://localhost:3000",
            credentials: true,
        };
        app.use(session({
            store: new MySQLStore({
                user: DB_CONFIG.username,
                password: DB_CONFIG.password,
                database: DB_CONFIG.database,
                host: DB_CONFIG.host,
                port: DB_CONFIG.port,
                checkExpirationInterval: 1000 * 2,
            }),
            secret: "lj2b12jnmv3242234ioj2",
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                maxAge: 1000 * 60 * 60 * 24 * 7 * 4,
            },
        }));
        server.applyMiddleware({ app, cors: corsOptions });
        app.listen(3001, () => {
            console.log("GraphQL API available at http://localhost:3001/graphql");
        });
    }
    catch (err) {
        console.log(err);
    }
});
main();
