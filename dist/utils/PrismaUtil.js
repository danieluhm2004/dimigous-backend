"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class PrismaUtil {
    static async getUser(ctx) {
        const { req } = ctx;
        const { authorization } = req.headers;
        if (!authorization)
            throw Error('로그인이 필요한 서비스에요.');
        try {
            const token = authorization.replace('Bearer ', '');
            const account = await jsonwebtoken_1.default.verify(token, 'THISISSECRETKEY!!!!!');
            return account;
        }
        catch (err) {
            throw Error('로그아웃되었어요. 다시 로그인해주세요.');
        }
    }
}
exports.default = PrismaUtil;
//# sourceMappingURL=PrismaUtil.js.map