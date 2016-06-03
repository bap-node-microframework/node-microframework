"use strict";
function EventListener() {
    var getArgs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        getArgs[_i - 0] = arguments[_i];
    }
    var eventName = getArgs[0];
    return function (target, name, descriptor) {
        if (!target.constructor.eventListeners) {
            target.constructor.eventListeners = {};
        }
        target.constructor.eventListeners[eventName] = descriptor.value;
    };
}
exports.EventListener = EventListener;
function EventSubscriber() {
    return function (target) {
        if (!target.constructor.eventListeners) {
            target.constructor.eventListeners = {};
        }
        console.log(target);
        target.registerEventListeners = function (dispatcher) {
            console.log(',,,', this.eventListeners);
            var _loop_1 = function() {
                var on = this_1.eventListeners[event];
                dispatcher.on(event, function onEvent() {
                    var mainArguments = Array.prototype.slice.call(arguments);
                    mainArguments.push(dispatcher);
                    on.apply(null, mainArguments);
                });
            };
            var this_1 = this;
            for (var event in this.eventListeners) {
                _loop_1();
            }
        };
    };
}
exports.EventSubscriber = EventSubscriber;
//# sourceMappingURL=events.decorators.js.map