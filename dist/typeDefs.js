"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs = apollo_server_express_1.gql `
  scalar DateTime
  enum Department {
    DC
    WP
    HD
    EB
  }

  type Account {
    idx: String!
    identity: String!
    studentId: String!
    username: String!
    phone: String!
    department: Department!
    createAt: DateTime!
    updateAt: DateTime!
  }

  type ResultToken {
    accessToken: String!
    refreshToken: String!
  }

  type Query {
    Me: Account
  }

  type Mutation {
    AuthLogin(idx: String!, password: String!): ResultToken!
    AuthSignup(
      identity: String!
      studentId: String!
      username: String!
      phone: String!
      department: Department!
      password: String
      passwordConfirm: String!
    ): Account!
  }
`;
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map