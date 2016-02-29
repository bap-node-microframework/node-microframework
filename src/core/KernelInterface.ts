import * as Sequelize from 'sequelize';

export interface KernelInterface {
    boot(app, sequelize: Sequelize.Sequelize, io: SocketIO.Server): void;
}
