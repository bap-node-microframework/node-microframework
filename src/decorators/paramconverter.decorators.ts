import * as express from "express";
import { Container } from '../core/container';

export function ParamConverter(...getArgs) {
    let aName = getArgs[0];
    let options = getArgs[1];
    let query = {};

    return function converter(target, name, descriptor) {
        let oldValue = descriptor.value;

        descriptor.value = (req, res) => {
            let findOptions = {};

            if (Array.isArray(options.filterBy)) {
                options.filterBy.forEach(col => {
                    findOptions[col] = req.params[col] || req.query[col];
                });
            } else { // object
                Object.keys(options.filterBy).forEach(col => {
                    findOptions[col] = req.params[options.filterBy[col]] || req.query[options.filterBy[col]];
                });
            }

            if (Container.getParameter('odm')) {
                query = findOptions;
            }
            else {
                query = { where: findOptions };
            }

            Container.getModel(options.model).findOne(query).then(data => {
                if (!data) {
                    return res.status(404).json({
                        error: "Cannot find " + options.model + " with " + JSON.stringify(findOptions)
                    });
                }

                req.params[aName] = data;

                return oldValue(req, res);
            }, error => {
                return res.status(500).json(error);
            });
        };
    }
}
