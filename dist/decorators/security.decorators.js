"use strict";
var express = require("express");
var router = express.Router();
function Security() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    var role = getArgs[0];
    return function (target, name, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function (req, res) {
            req.user.hasRole(role, function (err, hasRole) {
                if (err || !hasRole) {
                    return res.status(403).json({
                        'error': 'Invalid permissions'
                    });
                }
                return oldValue(req, res);
            });
        };
    };
}
exports.Security = Security;
//# sourceMappingURL=security.decorators.js.map