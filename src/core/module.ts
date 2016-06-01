import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';
import * as SocketIO from 'socket.io';
import { Container } from './container';


export abstract class Module {
    app: any;
    sequelize: Sequelize.Sequelize;
    mongoose: Mongoose.Mongoose;

    constructor(app: any, io: SocketIO.Server) {
        this.app = app;
        this.sequelize = Container.get('sequelize');
        this.mongoose = Container.get('mongoose');

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
