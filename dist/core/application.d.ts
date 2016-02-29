import * as Http from "http";
import * as express from "express";
import { KernelInterface } from './KernelInterface';
export interface ApplicationOptions {
    cors: boolean;
    sockets: boolean;
    oauth: boolean;
    orm: boolean;
}
export declare class Application {
    app: express.Express;
    httpServer: Http.Server;
    constructor(options: ApplicationOptions, kernel: KernelInterface);
    start(): void;
    private registerParsers();
    private registerLogger();
    private registerCors();
    private registerSoketIO();
    private registerOauthErrorHandler();
}
