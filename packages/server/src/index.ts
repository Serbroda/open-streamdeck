import { Server } from './Server';

export * from './Server';

const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
    const server = new Server();
    server.start();
}
