import { IResolvers } from 'graphql-tools';
import Query from './Query';
import Mutation from './Mutation';

const resolvers: IResolvers = {
  Query,
  Mutation,
};

export default resolvers;
