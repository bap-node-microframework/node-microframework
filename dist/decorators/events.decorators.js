"use strict";
function EventListener() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    var eventName = getArgs[0];
    return function (target, name, descriptor) {
        target.constructor.eventListeners[eventName] = descriptor.value;
    };
}
exports.EventListener = EventListener;
//# sourceMappingURL=events.decorators.js.map