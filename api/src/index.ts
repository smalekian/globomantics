import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import express from 'express';
import http from 'http';
import cors from 'cors';

import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';

import * as auth from './utils/auth';
import cookieParser from 'cookie-parser';
import { UsersDataSource } from './datasources/users';
import { SpeakersDataSource } from './datasources/speakers';
import { SessionsDataSource } from './datasources/sessions';
import { Context } from './Context';
import { User } from './schema/types.generated';
const app = express();
app.use(cors());
app.use(cookieParser());

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

app.use(function (req, res, next) {
  setTimeout(() => {
    console.log('requesting now');
    next();
  }, 1000);
});

app.use(
  '/graphql',
  cors<cors.CorsRequest>(),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => {
      console.log('request authorization', req.headers.authorization);

      let user = null;

      if (req.headers.authorization) {
        const payload = auth.verifyToken(req.headers.authorization) as User | null;
        user = payload;
      } else if (req.cookies.token) {
        const payload = auth.verifyToken(req.cookies.token) as User | null;
        user = payload;
      }

      const dataSources = {
        users: await UsersDataSource.create(),
        speakers: await SpeakersDataSource.create(),
        sessions: await SessionsDataSource.create(),
      };

      return {
        user,
        res,
        dataSources,
      };
    },
  })
);

const host = process.env.HOST ?? '127.0.0.1';
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
  console.log(`[ GraphQL ready ] http://${host}:${port}/graphql`);
});
