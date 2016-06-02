export declare class Container {
    static models: Object;
    static services: Object;
    static parameters: Object;
    static registerModel(modelName: any, model: any): void;
    static getModel(modelName: any): any;
    static registerService(serviceName: any, service: any): void;
    static debugServices(): void;
    static get(serviceName: any): any;
    static has(serviceName: any): boolean;
    static setParameter(name: any, value: any): void;
    static getParameter(name: any): any;
}
