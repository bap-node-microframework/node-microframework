import * as express from "express";
import { Container } from "../core/container";
import * as _  from "lodash";

export function QueryParam(...getArgs) {

    let aName = getArgs[0];
    let aType = getArgs[1];
    let isNullable = getArgs[2];

    return function validator(target, name, descriptor) {
        let oldValue = descriptor.value;

        descriptor.value = (req, res) => {

            if (!isNullable && !req.query[aName]) {
                return res.status(400).json({
                    error: "parameter " + aName + " is required"
                });
            }

            if (!isNullable && !_[aType](req.query[aName])) {
                return res.status(400).json({
                    error: "parameter " + aName + " should typeof " + aType
                });
            }

            return oldValue(req, res);
        };
    };
}
