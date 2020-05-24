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
const entities_1 = require("../entities");
const types_1 = require("./types");
const middleware_1 = require("../middleware");
let InvoiceResolver = class InvoiceResolver {
    createInvoice(invoiceInput, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const invoice = this.invoiceRepository.create(Object.assign(Object.assign({}, invoiceInput), { user: ctx.user, number: ctx.user.invoices.length > 0
                    ? ctx.user.invoices[ctx.user.invoices.length - 1].number + 1
                    : 1, items: invoiceInput.itemUrls.map((itemUrl) => ({
                    jiraId: itemUrl.split("/")[itemUrl.split("/").length - 1],
                    issueId: itemUrl.split("/")[itemUrl.split("/").length - 3],
                })) }));
            return yield this.invoiceRepository.save(invoice);
        });
    }
    updateInvoice(invoiceId, invoiceInput, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const { number } = ctx.user.invoices[ctx.user.invoices.length - 1];
            yield this.invoiceRepository.delete(invoiceId);
            const invoice = this.invoiceRepository.create(Object.assign(Object.assign({}, invoiceInput), { user: ctx.user, number, items: invoiceInput.itemUrls.map((itemUrl) => ({
                    jiraId: itemUrl.split("/")[itemUrl.split("/").length - 1],
                    issueId: itemUrl.split("/")[itemUrl.split("/").length - 3],
                })) }));
            return yield this.invoiceRepository.save(invoice);
        });
    }
};
__decorate([
    typeorm_typedi_extensions_1.InjectRepository(entities_1.Invoice),
    __metadata("design:type", typeorm_1.Repository)
], InvoiceResolver.prototype, "invoiceRepository", void 0);
__decorate([
    typeorm_typedi_extensions_1.InjectRepository(entities_1.InvoiceItem),
    __metadata("design:type", typeorm_1.Repository)
], InvoiceResolver.prototype, "invoiceItemRepository", void 0);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Mutation((returns) => entities_1.Invoice),
    __param(0, type_graphql_1.Arg("invoice")),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.InvoiceInput, Object]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "createInvoice", null);
__decorate([
    type_graphql_1.Authorized(),
    type_graphql_1.UseMiddleware(middleware_1.LogAction),
    type_graphql_1.Mutation((returns) => entities_1.Invoice),
    __param(0, type_graphql_1.Arg("id")),
    __param(1, type_graphql_1.Arg("invoice")),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, types_1.InvoiceInput, Object]),
    __metadata("design:returntype", Promise)
], InvoiceResolver.prototype, "updateInvoice", null);
InvoiceResolver = __decorate([
    type_graphql_1.Resolver()
], InvoiceResolver);
exports.InvoiceResolver = InvoiceResolver;
