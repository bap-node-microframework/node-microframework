import * as Sequelize from 'sequelize';
export declare abstract class KernelInterface {
    abstract boot(app: any, sequelize: Sequelize.Sequelize, io: SocketIO.Server): void;
}
