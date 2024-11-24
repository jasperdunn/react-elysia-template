import { cors } from '@elysiajs/cors';
import { Elysia, t } from 'elysia';

let magicNumber = 0;

const server = new Elysia()
  .use(
    cors({
      origin: process.env.APP_CLIENT_URL,
    })
  )
  .get('/magic-number', () => {
    return new Promise<{
      magicNumber: number;
    }>((resolve) => {
      setTimeout(() => {
        resolve({
          magicNumber,
        });
      }, 1000);
    });
  })
  .post(
    '/magic-number',
    ({ body }) => {
      return new Promise<void>((resolve) => {
        setTimeout(() => {
          magicNumber = body.magicNumber;
        }, 1000);
        resolve();
      });
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
