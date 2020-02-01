import { gql } from 'apollo-server-express';

const typeDefs = gql`
  scalar DateTime
  type Story {
    _id: String!
    number: Int!
    contents: String!
    createAt: DateTime!
  }

  type AdminStory {
    _id: String!
    number: Int!
    contents: String!
    account: Account!
    createAt: DateTime!
  }

  type Account {
    _id: String!
    identity: String!
    studentId: String!
    username: String!
    phone: String!
    createAt: DateTime!
    updateAt: DateTime!
  }

  type ResultToken {
    accessToken: String!
  }

  type PhoneToken {
    phone: String!
  }

  type Query {
    AuthMe: Account

    StoryView: [Story]!
    StoryViewOne(idx: String!): Story!

    AdminStoryView: [AdminStory]!
    AdminStoryViewOne(idx: String!): AdminStory!

    AdminAccountView: [Account]!
    AdminAccountViewOne(idx: String!): Account!
  }

  type Mutation {
    AuthLogin(idx: String!, password: String!): ResultToken!
    AuthSignup(
      identity: String!
      studentId: String!
      username: String!
      phone: String!
      password: String
      passwordConfirm: String!
    ): Account!
    AuthPhone(phone: String!): PhoneToken!
    AuthVerify(phone: String!, randomCode: String!): PhoneToken!

    StoryWrite(contents: String!): Story!

    AdminStoryActive(idx: String!, active: Boolean!): Story!
    AdminAccountActive(idx: String!, active: Boolean!): Account!
  }
`;

export default typeDefs;
