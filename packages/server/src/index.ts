import { Server } from './Server';

export * from './Server';

var args = process.argv.slice(2);

if (args.includes('--start-server')) {
    const server = new Server();
    server.start();
}
