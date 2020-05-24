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
const User_1 = require("./User");
const InvoiceItem_1 = require("./InvoiceItem");
let Invoice = class Invoice {
};
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.ID),
    typeorm_1.PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], Invoice.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.Int),
    typeorm_1.Column("int"),
    __metadata("design:type", Number)
], Invoice.prototype, "number", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Invoice.prototype, "issued", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "status", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "businessName", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column({
        type: "varchar",
        length: 255,
    }),
    __metadata("design:type", String)
], Invoice.prototype, "billTo", void 0);
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.Float),
    typeorm_1.Column("float"),
    __metadata("design:type", Number)
], Invoice.prototype, "ratePerHour", void 0);
__decorate([
    type_graphql_1.Field((type) => type_graphql_1.Float),
    typeorm_1.Column("float"),
    __metadata("design:type", Number)
], Invoice.prototype, "total", void 0);
__decorate([
    type_graphql_1.Field(),
    typeorm_1.Column("varchar"),
    __metadata("design:type", String)
], Invoice.prototype, "due", void 0);
__decorate([
    typeorm_1.ManyToOne((type) => User_1.User, (user) => user.invoices, { nullable: false }),
    __metadata("design:type", User_1.User)
], Invoice.prototype, "user", void 0);
__decorate([
    type_graphql_1.Field((type) => [InvoiceItem_1.InvoiceItem]),
    typeorm_1.OneToMany((type) => InvoiceItem_1.InvoiceItem, (item) => item.invoice, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", Array)
], Invoice.prototype, "items", void 0);
Invoice = __decorate([
    type_graphql_1.ObjectType(),
    typeorm_1.Entity()
], Invoice);
exports.Invoice = Invoice;
