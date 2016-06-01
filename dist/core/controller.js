"use strict";
var container_1 = require('./container');
var BaseController = (function () {
    function BaseController() {
    }
    BaseController.prototype.cget = function (res, model) {
        var getModel = container_1.Container.getModel(model);
        if (container_1.Container.getParameter('odm')) {
            getModel.find().then(function (data) { res.status(200).json(data); }, function (err) { res.status(404).json({ error: err }); });
        }
        else {
            getModel.findAll().then(function (data) { res.status(200).json(data); }, function (err) { res.status(404).json({ error: err }); });
        }
    };
    BaseController.prototype.post = function (model, form, request, response) {
        var postModel;
        if (container_1.Container.getParameter('odm')) {
            var tmp = container_1.Container.getModel(model);
            postModel = new tmp({});
        }
        else {
            postModel = container_1.Container.getModel(model).build();
        }
        if (typeof model === "string") {
            model = postModel;
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
        if (container_1.Container.getParameter('odm')) {
            object.remove().then(function () { res.status(204).send(); }, function (err) { res.status(500).json({ error: err }); });
        }
        else {
            object.destroy().then(function () { res.status(204).send(); }, function (err) { res.status(500).json({ error: err }); });
        }
    };
    return BaseController;
}());
exports.BaseController = BaseController;
//# sourceMappingURL=controller.js.map