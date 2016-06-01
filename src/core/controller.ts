import { Container } from './container';
import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';

export abstract class BaseController {
    req: any;
    res: any;
    sequelize: Sequelize.Sequelize;
    mongoose: Mongoose.Mongoose;
    postModel: any;

    static router: any;

    get(res: any, model: any) {
        if (typeof model !== "string") {
            res.status(200).json(model);
        }
    }

    cget(res: any, model: any) {
        let getModel = Container.getModel(model);

        if (Container.getParameter('odm')) {
            getModel.find().then(
                (data) => { res.status(200).json(data) },
                (err) => { res.status(404).json({ error: err }); }
            );
        }
        else {
            getModel.findAll().then(
                (data) => { res.status(200).json(data) },
                (err) => { res.status(404).json({ error: err }); }
            );
        }
    }

    post(model: any, form: any, request: any, response: any) {
        let postModel;

        if (Container.getParameter('odm')) {
            let tmp = Container.getModel(model);
            postModel = new tmp({});
        }
        else {
            postModel = Container.getModel(model).build();
        }

        if (typeof model === "string") {
            model = postModel;
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
        if (Container.getParameter('odm')) {
            object.remove().then(
                () => { res.status(204).send() },
                (err) => { res.status(500).json({ error: err }); }
            );
        }
        else {
            object.destroy().then(
                () => { res.status(204).send() },
                (err) => { res.status(500).json({ error: err }); }
            );
        }
    }
}
