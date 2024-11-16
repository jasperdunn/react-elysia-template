import { treaty } from '@elysiajs/eden';
import type { Server } from '@my-app/server';

export const server = treaty<Server>(import.meta.env.VITE_SERVER_URL);
