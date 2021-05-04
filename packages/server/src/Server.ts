import express from 'express';
import { ServerProperties } from './models/ServerProperties';

export class Server {
    private readonly _app = express();
    private readonly _props: ServerProperties;

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
            return console.log(`server is listening on ${this._props.port}`);
        });
    }
}
