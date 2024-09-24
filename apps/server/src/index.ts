import { Elysia, t } from 'elysia';
import { cors } from '@elysiajs/cors';

let magicNumber = 0;

const server = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:5173',
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
