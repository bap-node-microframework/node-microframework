"use strict";
// Register logger
var logger_1 = require("./logger");
var container_1 = require('./container');
var bodyParser = require('body-parser');
var cors = require('cors');
var multer = require("multer");
var config = require('config');
var Sequelize = require('sequelize');
var SocketIO = require("socket.io");
var Http = require("http");
var express = require("express");
var path = require('path');
var Application = (function () {
    function Application(options, kernel) {
        this.app = express();
        this.httpServer = Http.createServer(this.app);
        container_1.Container.setParameter('rootDirectory', container_1.Container.getParameter('appDirectory') + path.sep + '..');
        container_1.Container.registerService('app', this.app);
        this.registerParsers();
        this.registerLogger();
        if (options.cors) {
            this.registerCors();
        }
        if (options.sockets) {
            var io = this.registerSocketIO();
        }
        if (options.orm) {
            // Register DB
            var sequelize = new Sequelize(config.get('orm.dsn').toString(), {
                logging: (process.env.DEBUG || config.get('orm.debug')) ? console.log : false,
                define: {
                    timestamps: false
                }
            });
            container_1.Container.registerService('sequelize', sequelize);
        }
        kernel.boot(this.app, options.sockets ? io : null);
        if (options.oauth) {
            this.registerOauthErrorHandler();
        }
    }
    Application.prototype.start = function () {
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
    return Application;
}());
exports.Application = Application;
//# sourceMappingURL=application.js.map