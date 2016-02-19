
export abstract class Module {
    app:any;
    sequelize:Sequelize.Instance;

    constructor(app:any, sequelize:Sequelize.Instance, io:SocketIO.Server) {
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
