"use strict";
var _ = require("lodash");
function QueryValidator() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    var aName = getArgs[0];
    var aType = getArgs[1];
    var isNullable = getArgs[2];
    return function validator(target, name, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function (req, res) {
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
exports.QueryValidator = QueryValidator;
//# sourceMappingURL=queryvalidator.decorators.js.map