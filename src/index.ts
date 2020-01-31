import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import Express, { Application } from 'express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

createConnection()
  .then(async () => {
    const app: Application = Express();
    const apollo = new ApolloServer({
      typeDefs,
      resolvers,
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
