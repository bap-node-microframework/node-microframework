import * as Sequelize from 'sequelize';

export abstract class Module {
    app: any;
    sequelize: Sequelize.Sequelize;

    constructor(app: any, sequelize: Sequelize.Sequelize, io: SocketIO.Server) {
        this.app = app;
        this.sequelize = sequelize;

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
