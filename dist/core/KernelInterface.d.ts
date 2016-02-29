import * as Sequelize from 'sequelize';
export interface KernelInterface {
    boot(app: any, sequelize: Sequelize.Sequelize, io: SocketIO.Server): void;
}
