// Register logger
import { Logger } from "./logger";
import { Container } from './container';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as multer from "multer";
import * as config from 'config';
import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';
import * as SocketIO from "socket.io";
import * as Http from "http";
import * as express from "express";
import * as path from 'path';
import { KernelInterface } from './KernelInterface';

export interface ApplicationOptions {
    cors: boolean,
    sockets: boolean,
    oauth: boolean,
    orm: boolean,
    odm: boolean
}

export class Application {
    app: express.Express;
    httpServer: Http.Server

    constructor(options: ApplicationOptions, kernel: KernelInterface) {
        this.app = express();
        this.httpServer = Http.createServer(this.app);

        Container.setParameter('rootDirectory', Container.getParameter('appDirectory') + path.sep + '..');
        Container.registerService('app', this.app);

        this.registerParsers();
        this.registerLogger();

        if (options.cors) {
            this.registerCors();
        }

        if (options.sockets) {
            var io = this.registerSocketIO();
        }

        if (options.orm) {
            // Register DB
            var sequelize = new Sequelize(config.get('orm.dsn').toString(), {
                logging: (process.env.DEBUG || config.get('orm.debug')) ? console.log : false,
                define: {
                    timestamps: false
                },
                dialectOptions: {
                    multipleStatements: true
                }
            });
            Container.registerService('sequelize', sequelize);
        }

        if (options.odm) {
            var mongoose = Mongoose.connect(config.get('odm.dsn').toString());
            Container.registerService('mongoose', mongoose);
        }

        kernel.boot(this.app, options.sockets ? io : null);

        if (options.oauth) {
            this.registerOauthErrorHandler()
        }
    }

    start() {
        this.httpServer.listen(process.env.PORT || 3000);
    }

    private registerParsers() {
        // configure app to use bodyParser()
        // this will let us get the data from a POST
        this.app.use(bodyParser.urlencoded({ extended: true }));  // for parsing application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); // for parsing application/json
        this.app.use(multer().any()); // for parsing multipart/form-data
    }

    private registerLogger() {
        Container.setParameter('logDirectory', Container.getParameter('rootDirectory') + path.sep + 'logs');

        this.app.use(Logger.register(config));
    }

    private registerCors() {
        // Cors
        var corsOptions = {
            credentials: true,
            origin: function(origin, callback) {
                callback(null, true);
            }
        };
        this.app.use(cors(corsOptions));
    }

    private registerSocketIO() {
        let io = SocketIO(this.httpServer);
        Container.registerService('io', io);

        return io;
    }

    private registerOauthErrorHandler() {
        this.app.use(Container.get('oauth').errorHandler());
    }
}
