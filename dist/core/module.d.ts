import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';
export declare abstract class Module {
    app: any;
    sequelize: Sequelize.Sequelize;
    mongoose: Mongoose.Mongoose;
    constructor(app: any, io: SocketIO.Server);
    abstract registerControllers(): any;
    registerModels(): void;
    registerServices(): void;
    registerSockets(socket: any): void;
}
