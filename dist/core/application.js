"use strict";
// Register logger
var logger_1 = require("./logger");
var container_1 = require('./container');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require("multer");
var config = require('config');
var SocketIO = require("socket.io");
var Http = require("http");
var express = require("express");
var path = require('path');
var Application = (function () {
    function Application(options, kernel) {
        this.app = express();
        this.plugins = [];
        this.httpServer = Http.createServer(this.app);
        this.kernel = kernel;
        this.options = options;
        container_1.Container.setParameter('rootDirectory', container_1.Container.getParameter('appDirectory') + path.sep + '..');
        container_1.Container.registerService('app', this.app);
        this.registerParsers();
        this.registerLogger();
        if (options.cors) {
            this.registerCors();
        }
        if (options.sockets) {
            this.io = this.registerSocketIO();
        }
    }
    Application.prototype.start = function () {
        this.kernel.boot(this.app, this.options.sockets ? this.io : null);
        if (this.options.oauth) {
            this.registerOauthErrorHandler();
        }
        this.httpServer.listen(process.env.PORT || 3000);
    };
    Application.prototype.registerParsers = function () {
        // configure app to use bodyParser()
        // this will let us get the data from a POST
        this.app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
        this.app.use(bodyParser.json()); // for parsing application/json
        this.app.use(multer().any()); // for parsing multipart/form-data
    };
    Application.prototype.registerLogger = function () {
        container_1.Container.setParameter('logDirectory', container_1.Container.getParameter('rootDirectory') + path.sep + 'logs');
        this.app.use(logger_1.Logger.register(config));
    };
    Application.prototype.registerCors = function () {
        // Cors
        var corsOptions = {
            credentials: true,
            origin: function (origin, callback) {
                callback(null, true);
            }
        };
        this.app.use(cors(corsOptions));
    };
    Application.prototype.registerSocketIO = function () {
        var io = SocketIO(this.httpServer);
        container_1.Container.registerService('io', io);
        return io;
    };
    Application.prototype.registerOauthErrorHandler = function () {
        this.app.use(container_1.Container.get('oauth').errorHandler());
    };
    Application.prototype.registerPlugin = function (plugin) {
        this.plugins.push(plugin);
    };
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=application.js.map