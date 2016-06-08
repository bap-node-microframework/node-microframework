"use strict";
var container_1 = require('./container');
var fs = require("fs");
var path = require('path');
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var Logger = (function () {
    function Logger() {
    }
    Logger.register = function (config) {
        var logDirectory = container_1.Container.getParameter('logDirectory');
        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
        // create a rotating write stream
        var accessLogStream = FileStreamRotator.getStream({
            filename: logDirectory + path.sep + (config.get('log.file_format') || 'access-%DATE%.log'),
            frequency: config.get('log.rotate.frequency') || 'daily',
            verbose: config.get('log.verbose') || false,
            date_format: config.get('log.date_format') || 'YYYYMMDD'
        });
        var skip = function () { return false; };
        if (config.get('log.skip') !== 'none') {
            skip = function (req, res) {
                return res.statusCode < Number(config.get('log.skip'));
            };
        }
        return morgan('combined', {
            stream: accessLogStream,
            skip: skip
        });
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map