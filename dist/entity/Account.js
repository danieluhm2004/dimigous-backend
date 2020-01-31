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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Department_1 = __importDefault(require("../enums/Department"));
const mongodb_1 = require("mongodb");
let Account = class Account extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", mongodb_1.ObjectID)
], Account.prototype, "idx", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: true }),
    __metadata("design:type", Boolean)
], Account.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], Account.prototype, "isAdmin", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Account.prototype, "identity", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Account.prototype, "studentId", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Account.prototype, "username", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Account.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", Number)
], Account.prototype, "department", void 0);
__decorate([
    typeorm_1.Column({ type: 'text' }),
    __metadata("design:type", String)
], Account.prototype, "password", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Account.prototype, "createAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'datetime' }),
    __metadata("design:type", Date)
], Account.prototype, "updateAt", void 0);
Account = __decorate([
    typeorm_1.Entity('Account')
], Account);
exports.Account = Account;
exports.default = Account;
//# sourceMappingURL=Account.js.map