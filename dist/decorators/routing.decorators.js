"use strict";
var container_1 = require('../core/container');
var router = container_1.Container.get('router');
function Get() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    return function (target, name, descriptor) {
        if (container_1.Container.has('oauth')) {
            router.get(getArgs[0], container_1.Container.get('oauth').authorise(), function (req, res) { return descriptor.value(req, res); });
            return;
        }
        router.get(getArgs[0], function (req, res) { return descriptor.value(req, res); });
    };
}
exports.Get = Get;
function Post() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    return function (target, name, descriptor) {
        if (container_1.Container.has('oauth')) {
            router.post(getArgs[0], container_1.Container.get('oauth').authorise(), function (req, res) { return descriptor.value(req, res); });
            return;
        }
        router.post(getArgs[0], function (req, res) { return descriptor.value(req, res); });
    };
}
exports.Post = Post;
function Put() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    return function (target, name, descriptor) {
        if (container_1.Container.has('oauth')) {
            router.put(getArgs[0], container_1.Container.get('oauth').authorise(), function (req, res) { return descriptor.value(req, res); });
            return;
        }
        router.put(getArgs[0], function (req, res) { return descriptor.value(req, res); });
    };
}
exports.Put = Put;
function Delete() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    return function (target, name, descriptor) {
        if (container_1.Container.has('oauth')) {
            router.delete(getArgs[0], container_1.Container.get('oauth').authorise(), function (req, res) { return descriptor.value(req, res); });
            return;
        }
        router.delete(getArgs[0], function (req, res) { return descriptor.value(req, res); });
    };
}
exports.Delete = Delete;
function WithRouter() {
    return function (target) {
        target.router = router;
    };
}
exports.WithRouter = WithRouter;
//# sourceMappingURL=routing.decorators.js.map