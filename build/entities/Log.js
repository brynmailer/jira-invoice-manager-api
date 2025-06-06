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
const typeorm_1 = require("typeorm");
let Log = class Log {
};
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Log.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Log.prototype, "ip", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Log.prototype, "userAgent", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Log.prototype, "timestamp", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Log.prototype, "action", void 0);
Log = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Log);
exports.Log = Log;
