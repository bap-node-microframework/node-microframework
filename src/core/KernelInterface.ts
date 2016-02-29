import * as Sequelize from 'sequelize';
import * as SocketIO from 'socket.io';

export interface KernelInterface {
    boot(app, sequelize: Sequelize.Sequelize, io: SocketIO.Server): void;
}
