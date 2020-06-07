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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const typeorm_typedi_extensions_1 = require("typeorm-typedi-extensions");
const typedi_1 = require("typedi");
const bcrypt = __importStar(require("bcrypt"));
const entities_1 = require("../entities");
const types_1 = require("./types");
const middleware_1 = require("../middleware");
let UserResolver = class UserResolver {
    currentUser(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return ctx.user;
        });
    }
    register(userInput, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = this.userRepository.create(Object.assign(Object.assign({}, userInput), { password: yield bcrypt.hash(userInput.password, this.saltRounds), role: "BASIC" }));
            const savedUser = yield this.userRepository.save(user);
            ctx.req.session.userId = savedUser.id;
            ctx.req.session.userState = yield bcrypt.hash(ctx.req.sessionID, this.saltRounds);
            return savedUser;
        });
    }
    login({ email, password }, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findOne({ email });
            if (!user)
                throw new Error("Incorrect email or password.");
            const valid = yield bcrypt.compare(password, user.password);
            if (!valid)
                throw new Error("Incorrect email or password.");
            ctx.req.session.userId = user.id;
            ctx.req.session.userState = yield bcrypt.hash(ctx.req.sessionID, this.saltRounds);
            return user;
        });
    }
    logout(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((res, rej) => ctx.req.session.destroy((err) => {
                if (err) {
                    rej({ message: "Logout unsuccessful." });
                }
                res({ message: "Successfully logged out." });
            }));
        });
    }
};
__decorate([
    typeorm_typedi_extensions_1.InjectRepository(entities_1.User),
    __metadata("design:type", typeorm_1.Repository)
], UserResolver.prototype, "userRepository", void 0);
__decorate([
    typedi_1.Inject("SALT_ROUNDS"),
    __metadata("design:type", Number)
], UserResolver.prototype, "saltRounds", void 0);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Query((returns) => entities_1.User),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "currentUser", null);
__decorate([
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Mutation((returns) => entities_1.User),
    __param(0, type_graphql_1.Arg("user")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UserInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Mutation((returns) => entities_1.User),
    __param(0, type_graphql_1.Args()),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.LoginArgs, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Mutation((returns) => entities_1.Message),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "logout", null);
UserResolver = __decorate([
    type_graphql_1.Resolver()
], UserResolver);
exports.UserResolver = UserResolver;
