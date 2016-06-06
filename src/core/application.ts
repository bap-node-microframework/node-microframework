// Register logger
import { Logger } from "./logger";
import { Container } from './container';
import * as bodyParser from 'body-parser';
import * as multer from "multer";
import * as config from 'config';
import * as SocketIO from "socket.io";
import * as Http from "http";
import * as express from "express";
import * as path from 'path';
import { KernelInterface } from './KernelInterface';

export interface ApplicationOptions {
    sockets: boolean,
    oauth: boolean
}

export class Application {
    app: express.Express;
    httpServer: Http.Server
    plugins: any;
    kernel: KernelInterface;
    options: ApplicationOptions;
    io: any;

    constructor(options: ApplicationOptions, kernel: KernelInterface) {
        this.app = express();
        this.plugins = [];
        this.httpServer = Http.createServer(this.app);
        this.kernel = kernel;
        this.options = options;

        Container.setParameter('rootDirectory', Container.getParameter('appDirectory') + path.sep + '..');
        Container.registerService('app', this.app);

        this.registerParsers();
        this.registerLogger();

        if (options.sockets) {
            this.io = this.registerSocketIO();
        }
    }

    start() {
        this.kernel.boot(this.app, this.options.sockets ? this.io : null);

        if (this.options.oauth) {
            this.registerOauthErrorHandler()
        }

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

    private registerSocketIO() {
        let io = SocketIO(this.httpServer);
        Container.registerService('io', io);

        return io;
    }

    private registerOauthErrorHandler() {
        this.app.use(Container.get('oauth').errorHandler());
    }

    public registerPlugin(plugin) {
        this.plugins.push(plugin);
    }
}
