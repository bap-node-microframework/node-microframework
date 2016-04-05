import * as Sequelize from 'sequelize';
import * as SocketIO from 'socket.io';

export abstract class KernelInterface {
    abstract boot(app, io: SocketIO.Server): void;
}
