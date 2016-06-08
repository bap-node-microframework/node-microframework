"use strict";
var Container = (function () {
    function Container() {
    }
    Container.registerModel = function (modelName, model) {
        if (this.applicationContainer) {
            return this.applicationContainer.registerModel(modelName, model);
        }
        this.models[modelName] = model;
    };
    Container.getModel = function (modelName) {
        if (this.applicationContainer) {
            return this.applicationContainer.getModel(modelName);
        }
        return this.models[modelName];
    };
    Container.registerService = function (serviceName, service) {
        if (this.applicationContainer) {
            return this.applicationContainer.registerService(serviceName, service);
        }
        this.services[serviceName] = service;
    };
    Container.get = function (serviceName) {
        if (this.applicationContainer) {
            return this.applicationContainer.get(serviceName);
        }
        return this.services[serviceName];
    };
    Container.has = function (serviceName) {
        if (this.applicationContainer) {
            return this.applicationContainer.has(serviceName);
        }
        return Object.keys(this.services).indexOf(serviceName) != -1;
    };
    Container.setParameter = function (name, value) {
        if (this.applicationContainer) {
            return this.applicationContainer.setParameter(name, value);
        }
        this.parameters[name] = value;
    };
    Container.getParameter = function (name) {
        if (this.applicationContainer) {
            return this.applicationContainer.getParameter(name);
        }
        return this.parameters[name];
    };
    Container.getApplicationInstance = function () {
        return this.applicationContainer;
    };
    Container.setApplicationInstance = function (container) {
        this.applicationContainer = container;
    };
    Container.models = {};
    Container.services = {};
    Container.parameters = {};
    return Container;
}());
exports.Container = Container;
//# sourceMappingURL=container.js.map