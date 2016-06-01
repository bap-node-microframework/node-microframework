import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';
export declare abstract class BaseController {
    req: any;
    res: any;
    sequelize: Sequelize.Sequelize;
    mongoose: Mongoose.Mongoose;
    postModel: any;
    static router: any;
    cget(res: any, model: any): void;
    post(model: any, form: any, request: any, response: any): void;
    put(model: any, form: any, request: any, response: any): void;
    static processForm(model: any, form: any, request: any, response: any): void;
    delete(res: any, object: any): void;
}
