import Express, { Application } from 'express';
import Mongoose from 'mongoose';
import DotEnv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import AWS from 'aws-sdk';
import os from 'os';

if (process.env.NODE_ENV === 'development') DotEnv.config();
const app: Application = Express();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESSKEY || '',
  secretAccessKey: process.env.AWS_SECRETKEY || '',
  region: process.env.AWS_REGION || 'ap-northeast-1',
});

Mongoose.Promise = global.Promise;
Mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dimigous', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  autoIndex: true,
});

Mongoose.connection.once('connected', () => {
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: (params: any) => ({ ...params }),
  });

  app.disable('x-powered-by');
  app.use((req: any, res: any, next: any) => {
    res.setHeader('X-Cluster-Id', os.hostname());
    next();
  });

  apollo.applyMiddleware({
    app,
    cors: {
      origin:
        process.env.NODE_ENV === 'production'
          ? 'https://dimigo.us'
          : `http://localhost:${process.env.PORT || 3000}`,
    },
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(
      `🚀  - 서버가 준비되었어요. v${process.env.npm_package_version}`,
    );
  });
});

Mongoose.connection.once('error', err => {
  console.log('❌  - 오류가 발생했어요.');
  console.log('❌  -', err.message);
  process.exit(1);
});
