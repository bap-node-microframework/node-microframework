import * as SocketIO from 'socket.io';
import { Container } from './container';

export abstract class Module {
    app: any;

    constructor(app: any, io: SocketIO.Server) {
        this.app = app;

        this.registerServices();
        this.registerControllers();
        this.registerModels();

        if (io) {
            io.on('connection', socket => {
                this.registerSockets(socket);
            });
        }
    }

    abstract registerControllers()

    registerModels() {

    }

    registerServices() {

    }

    registerSockets(socket) {

    }
}
