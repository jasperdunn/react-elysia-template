import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';

const server = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:5173',
    })
  )
  .get('/random-number', () => Math.floor(Math.random() * 100))
  .listen(3000);

console.log(`🦊 Elysia is running at ${server.server?.url}`);

export type Server = typeof server;
