import { Container } from './container';
import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';

export abstract class BaseController {
    req: any;
    res: any;
    sequelize: Sequelize.Sequelize;
    mongoose: Mongoose.Mongoose;

    static router: any;

    post(model: any, form: any, request: any, response: any) {
        if (typeof model === "string") {
            model = Container.getModel(model).build();
        }

        BaseController.processForm(model, form, request, response);
    }

    put(model: any, form: any, request: any, response: any) {
        BaseController.processForm(model, form, request, response);
    }

    static processForm(model: any, form: any, request: any, response: any) {
        form.handle(request, {
            success: (form) => {
                Object.keys(form.data).forEach((key) => {
                    model[key] = form.data[key];
                });

                model.save().then(
                    savedModel => {
                        if (request.method === 'PUT') {
                            return response.status(204).send();
                        }

                        return response.status(201).send(savedModel)
                    },
                    error => { response.status(500).json(error); }
                );
            },
            error: (form) => {
                response.status(400).json(form);
            },
            empty: (form) => {
                response.status(404).json(form);
            }
        });
    }

    delete(res, object) {
        object.destroy().then(
            () => { res.status(204).send() },
            (err) => { res.status(500).json({ error: err }); }
        );
    }
}
