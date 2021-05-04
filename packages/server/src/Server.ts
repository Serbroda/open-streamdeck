import express from 'express';
import http from 'http';
import { ServerProperties } from './models/ServerProperties';

export class Server {
    private readonly _app = express();
    private readonly _props: ServerProperties;
    private _server;

    constructor(props?: Partial<ServerProperties>) {
        this._props = {
            ...{
                port: 62414,
            },
            ...props,
        };
    }

    public start() {
        this._app.get('/', (req, res) => {
            res.send('Lol');
        });

        this._app.listen(this._props.port, () => {
            this._server = http.createServer(this._app);
            return console.log(`server is listening on ${this._props.port}`);
        });
    }

    public stop() {
        if (this._server) {
            this._server.close();
        }
    }
}
