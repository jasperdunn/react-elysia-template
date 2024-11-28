import { cors } from '@elysiajs/cors';
import { Elysia, t } from 'elysia';

let magicNumber = 0;

const server = new Elysia()
  .use(
    cors({
      origin: process.env.APP_CLIENT_URL,
    })
  )
  .get(
    '/magic-number',
    () => {
      return {
        magicNumber,
      };
    },
    {
      response: t.Object({
        magicNumber: t.Number(),
      }),
    }
  )
  .post(
    '/magic-number',
    ({ body }) => {
      magicNumber = body.magicNumber;
    },
    {
      body: t.Object({
        magicNumber: t.Number(),
      }),
    }
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${server.server?.url}`);

export type Server = typeof server;
