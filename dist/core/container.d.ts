export declare class Container {
    static models: Object;
    static services: Object;
    static parameters: Object;
    static applicationContainer: any;
    static registerModel(modelName: any, model: any): any;
    static getModel(modelName: any): any;
    static registerService(serviceName: any, service: any): any;
    static get(serviceName: any): any;
    static has(serviceName: any): boolean;
    static setParameter(name: any, value: any): any;
    static getParameter(name: any): any;
    static getApplicationInstance(): any;
    static setApplicationInstance(container: any): void;
}
