"use strict";
var Module = (function () {
    function Module(app, sequelize, io) {
        var _this = this;
        this.app = app;
        this.sequelize = sequelize;
        this.registerServices();
        this.registerControllers();
        this.registerModels();
        if (io) {
            io.on('connection', function (socket) {
                _this.registerSockets(socket);
            });
        }
    }
    Module.prototype.registerModels = function () {
    };
    Module.prototype.registerServices = function () {
    };
    Module.prototype.registerSockets = function (socket) {
    };
    return Module;
}());
exports.Module = Module;
//# sourceMappingURL=module.js.map