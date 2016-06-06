export class Container {
    static models: Object = {}
    static services: Object = {}
    static parameters: Object = {}

    static registerModel(modelName, model) {
        this.models[modelName] = model;
    }

    static getModel(modelName) {
        return this.models[modelName];
    }

    static registerService(serviceName, service) {
        this.services[serviceName] = service;
    }

    static debugServices() {
        Object.keys(this.services).forEach((service, i) => {
            console.log(i + 1 + ") Name: " + service + "\t\t Class: " + this.services[service].constructor.name);
        });
    }

    static get(serviceName) {
        return this.services[serviceName];
    }

    static has(serviceName) {
        return Object.keys(this.services).indexOf(serviceName) != -1;
    }

    static setParameter(name, value) {
        this.parameters[name] = value;
    }

    static getParameter(name) {
        return this.parameters[name];
    }
}
