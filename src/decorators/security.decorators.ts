import * as express from "express";
import { Container } from '../core/container';

let router = express.Router();

export function Security(...getArgs) {
    let role = getArgs[0];

    return function(target, name, descriptor) {
        let oldValue = descriptor.value;
        descriptor.value = (req, res) => {
            req.user.hasRole(role, (err, hasRole) => {
                if (err || !hasRole) {
                    return res.status(403).json({
                        'error': 'Invalid permissions'
                    });
                }

                return oldValue(req, res);
            });
        };
    }
}
