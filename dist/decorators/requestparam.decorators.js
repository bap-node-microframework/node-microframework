"use strict";
var _ = require("lodash");
function RequestParam() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    var aName = getArgs[0];
    var options = getArgs[1];
    var isNullable = options.nullable || false;
    var defaultValue = options.default || null;
    var requirements = options.requirements || null;
    return function validator(target, name, descriptor) {
        var oldValue = descriptor.value;
        descriptor.value = function (req, res) {
            // param not nullable and null => error
            if (!isNullable && !req.params[aName]) {
                return res.status(400).json({
                    error: "parameter " + aName + " is required"
                });
            }
            // param not nullable and not valid => error
            if (!isNullable && !_[requirements](req.params[aName])) {
                return res.status(400).json({
                    error: "parameter " + aName + " should typeof " + requirements
                });
            }
            if (isNullable && !req.params[aName]) {
                req.query[aName] = defaultValue;
            }
            return oldValue(req, res);
        };
    };
}
exports.RequestParam = RequestParam;
//# sourceMappingURL=requestparam.decorators.js.map