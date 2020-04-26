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
exports.RateLimitDaily = ({ context, info }, next) => __awaiter(void 0, void 0, void 0, function* () {
    const redis = typedi_1.Container.get("REDIS_CLIENT");
    const key = `rate-limit-daily:${context.req.ip}`;
    const current = yield redis.incr(key);
    if (current > 1000) {
        throw new Error("Daily maximum number of requests exceeded.");
    }
    else if (current === 1) {
        yield redis.expire(key, 60 * 60 * 24);
    }
    return next();
});
