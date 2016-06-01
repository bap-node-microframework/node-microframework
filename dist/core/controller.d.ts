import * as Sequelize from 'sequelize';
import * as Mongoose from 'mongoose';
export declare abstract class BaseController {
    req: any;
    res: any;
    sequelize: Sequelize.Sequelize;
    mongoose: Mongoose.Mongoose;
    static router: any;
    post(model: any, form: any, request: any, response: any): void;
    put(model: any, form: any, request: any, response: any): void;
    static processForm(model: any, form: any, request: any, response: any): void;
    delete(res: any, object: any): void;
}
