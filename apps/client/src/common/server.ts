import { treaty } from '@elysiajs/eden';
import type { Server } from '@my-app/server';

export const server = treaty<Server>('http://localhost:3000');
