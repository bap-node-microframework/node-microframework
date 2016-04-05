import * as express from "express";
import { Container } from "../core/container";

export function RequestParam(...getArgs) {

    let aName = getArgs[0];
    let options = getArgs[1];
    let isNullable = options.nullable || false;
    let defaultValue = options.default || null;
    let requirements = options.requirements || null;

    return function validator(target, name, descriptor) {
        let oldValue = descriptor.value;

        descriptor.value = (req, res) => {

            // param not nullable and null => error
            if (!isNullable && !req.params[aName]) {
                return res.status(400).json({
                    error: "parameter " + aName + " is required"
                });
            }

            // param not nullable and not valid => error
            if (requirements) {
                let regex = new RegExp(requirements, "gi");
                if (!isNullable && !regex.test(req.params[aName])) {
                    return res.status(400).json({
                        error: "parameter " + aName + " match " + requirements
                    });
                }
            }

            // isNullable and null => default value
            if (isNullable && !req.params[aName]) {
                req.query[aName] = defaultValue;
            }

            return oldValue(req, res);
        };
    };
}
