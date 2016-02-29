import * as Sequelize from 'sequelize';
import * as SocketIO from 'socket.io';

export abstract class KernelInterface {
    abstract boot(app, sequelize: Sequelize.Sequelize, io: SocketIO.Server): void;
}
