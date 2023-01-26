import fastify from 'fastify';

import cors from '@fastify/cors';

import { appRoutes } from './routes';

const app = fastify();

app.register(cors, { origin: '*' });
app.register(appRoutes);

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('\nSERVER IS RUNNING AT :3333\n'));
