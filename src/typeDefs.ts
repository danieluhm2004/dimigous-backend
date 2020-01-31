import { gql } from 'apollo-server-express';

const typeDefs = gql`
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

export default typeDefs;
