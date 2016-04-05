import * as Sequelize from 'sequelize';
export declare abstract class Module {
    app: any;
    sequelize: Sequelize.Sequelize;
    constructor(app: any, io: SocketIO.Server);
    abstract registerControllers(): any;
    registerModels(): void;
    registerServices(): void;
    registerSockets(socket: any): void;
}
