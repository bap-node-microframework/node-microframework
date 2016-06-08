import { Container } from './container';
import fs = require("fs")
import * as path from 'path';
import * as morgan from 'morgan';
import * as FileStreamRotator from 'file-stream-rotator';
import * as express from 'express';

export class Logger {
    static register(config): express.RequestHandler {
        let logDirectory = Container.getParameter('logDirectory');

        // ensure log directory exists
        fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)

        // create a rotating write stream
        var accessLogStream = FileStreamRotator.getStream({
            filename: logDirectory + path.sep + (config.get('log.file_format') || 'access-%DATE%.log'),
            frequency: config.get('log.rotate.frequency') || 'daily',
            verbose: config.get('log.verbose') || false,
            date_format: config.get('log.date_format') || 'YYYYMMDD'
        });

        let skip: any = function() { return false };

        if (config.get('log.skip') !== 'none') {
            skip = function(req, res) {
                return res.statusCode < Number(config.get('log.skip'));
            };
        }

        return morgan('combined', {
            stream: accessLogStream,
            skip: skip
        });
    }
}
