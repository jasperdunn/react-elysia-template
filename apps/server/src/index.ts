import { Elysia, t, ValidationError } from 'elysia';
import { cors } from '@elysiajs/cors';
import { getRandomIntInclusive } from './utils/number';

const server = new Elysia()
  .use(
    cors({
      origin: 'http://localhost:5173',
    })
  )
  .get(
    '/random-number',
    ({ query }) => getRandomIntInclusive(query.minimum, query.maximum),
    {
      beforeHandle: ({ query, set }) => {
        if (query.minimum > query.maximum) {
          set.status = 422;
          throw new Error('minimum should be less than or equal to maximum');
        }
      },
      query: t.Object({
        minimum: t.Number(),
        maximum: t.Number(),
      }),
    }
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${server.server?.url}`);

export type Server = typeof server;
