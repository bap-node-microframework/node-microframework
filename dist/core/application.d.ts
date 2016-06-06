import * as Http from "http";
import * as express from "express";
import { KernelInterface } from './KernelInterface';
export interface ApplicationOptions {
    cors: boolean;
    sockets: boolean;
    oauth: boolean;
}
export declare class Application {
    app: express.Express;
    httpServer: Http.Server;
    plugins: any;
    kernel: KernelInterface;
    options: ApplicationOptions;
    io: any;
    constructor(options: ApplicationOptions, kernel: KernelInterface);
    start(): void;
    private registerParsers();
    private registerLogger();
    private registerCors();
    private registerSocketIO();
    private registerOauthErrorHandler();
    registerPlugin(plugin: any): void;
}
