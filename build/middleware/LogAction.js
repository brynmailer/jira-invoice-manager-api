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
const typeorm_1 = require("typeorm");
const entities_1 = require("../entities");
exports.LogAction = ({ context, info }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const logRespository = typeorm_1.getRepository(entities_1.Log);
    const log = logRespository.create({
        ip: context.req.ip,
        userAgent: context.req.headers["user-agent"],
        timestamp: new Date().toString(),
        action: info.fieldName
    });
    yield logRespository.save(log);
    return next();
});
