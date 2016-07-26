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

          morgan.format('bapformat', function bapFormatLine (tokens, req, res){
            var status = res._header
                ? res.statusCode
                : undefined;

            var colorStatus = status >= 500 ? 31 // red
                : status >= 400 ? 33 // yellow
                : status >= 300 ? 36 // cyan
                : status >= 200 ? 32 // green
                : 0;  // no color

            var fn = bapFormatLine[colorStatus];

            if (!fn) {
                // compile
                fn = bapFormatLine[colorStatus] = morgan.compile('\x1b[0m:date[iso] \x1b[0;1m:method \x1b[0m:url \x1b[' +
                colorStatus + 'm:status \x1b[0;3m:response-time ms - :res[content-length] - :user-agent \x1b[0m')
            }

            return fn(tokens, req, res);
        });

        return morgan(config.get('log.format') || 'bapformat', {
            stream: accessLogStream,
            skip: skip
        });
    }
}
