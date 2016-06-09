export class Container {
    static models: Object = {}
    static services: Object = {}
    static parameters: Object = {}
    static applicationContainer: any;

    static registerModel(modelName, model) {
        if (this.applicationContainer) {
            return this.applicationContainer.models[modelName] = model;
        }
        this.models[modelName] = model;
    }

    static getModel(modelName) {
        if (this.applicationContainer) {
            return this.applicationContainer.models[modelName];
        }
        return this.models[modelName];
    }

    static registerService(serviceName, service) {
        if (this.applicationContainer) {
            return this.applicationContainer.services[serviceName] = service;
        }
        this.services[serviceName] = service;
    }

    static get(serviceName) {
        if (this.applicationContainer) {
            return this.applicationContainer.services[serviceName];
        }
        return this.services[serviceName];
    }

    static has(serviceName) {
        if (this.applicationContainer) {
            return Object.keys(this.applicationContainer.services).indexOf(serviceName) != -1;
        }
        return Object.keys(this.services).indexOf(serviceName) != -1;
    }

    static setParameter(name, value) {
        if (this.applicationContainer) {
            return this.applicationContainer.parameters[name] = value;
        }
        this.parameters[name] = value;
    }

    static getParameter(name) {
        if (this.applicationContainer) {
            return this.applicationContainer.parameters[name];
        }
        return this.parameters[name];
    }

    static getApplicationInstance() {
        return this.applicationContainer;
    }

    static setApplicationInstance(container) {
        this.applicationContainer = container;
    }
}
