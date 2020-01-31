"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
typeorm_1.createConnection()
    .then(async () => {
    const app = express_1.default();
    const apollo = new apollo_server_express_1.ApolloServer({
        typeDefs: typeDefs_1.default,
        resolvers: resolvers_1.default,
        context: params => ({ ...params }),
    });
    apollo.applyMiddleware({
        app,
        cors: {
            origin: 'http://localhost:3000',
        },
    });
    app.listen(3000, () => {
        console.log('🚀  - 서버가 준비되었어요.');
    });
})
    .catch(err => {
    console.log('❌  - 오류가 발생했어요.');
    console.log('❌  -', err.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map