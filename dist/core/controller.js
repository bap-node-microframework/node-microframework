"use strict";
var container_1 = require('./container');
var BaseController = (function () {
    function BaseController() {
    }
    BaseController.prototype.post = function (model, form, request, response) {
        if (typeof model === "string") {
            model = container_1.Container.getModel(model).build();
        }
        BaseController.processForm(model, form, request, response);
    };
    BaseController.prototype.put = function (model, form, request, response) {
        BaseController.processForm(model, form, request, response);
    };
    BaseController.processForm = function (model, form, request, response) {
        form.handle(request, {
            success: function (form) {
                Object.keys(form.data).forEach(function (key) {
                    model[key] = form.data[key];
                });
                model.save().then(function (savedModel) {
                    if (request.method === 'PUT') {
                        return response.status(204).send();
                    }
                    return response.status(201).send(savedModel);
                }, function (error) { response.status(500).json(error); });
            },
            error: function (form) {
                response.status(400).json(form);
            },
            empty: function (form) {
                response.status(404).json(form);
            }
        });
    };
    BaseController.prototype.delete = function (res, object) {
        object.destroy().then(function () { res.status(204).send(); }, function (err) { res.status(500).json({ error: err }); });
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=controller.js.map