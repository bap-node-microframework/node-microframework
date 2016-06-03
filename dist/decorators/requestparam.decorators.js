"use strict";
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
            if (!isNullable && !req.body[aName]) {
                return res.status(400).json({
                    error: "parameter " + aName + " is required"
                });
            }
            // param not nullable and not valid => error
            if (requirements) {
                var regex = new RegExp(requirements, "g");
                if (req.body[aName] && !regex.test(req.body[aName])) {
                    return res.status(400).json({
                        error: "parameter " + aName + " should match " + requirements
                    });
                }
            }
            // isNullable and null => default value
            if (isNullable && !req.body[aName]) {
                req.query[aName] = defaultValue;
            }
            return oldValue(req, res);
        };
    };
}
exports.RequestParam = RequestParam;
//# sourceMappingURL=requestparam.decorators.js.map