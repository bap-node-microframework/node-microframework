export declare abstract class Module {
    app: any;
    constructor(app: any, io: SocketIO.Server);
    abstract registerControllers(): any;
    registerModels(): void;
    registerServices(): void;
    registerSockets(socket: any): void;
}
