"use strict";
var EventSuscriber = (function () {
    function EventSuscriber() {
    }
    EventSuscriber.registerEventListeners = function (dispatcher) {
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
    EventSuscriber.eventListeners = {};
    return EventSuscriber;
}());
exports.EventSuscriber = EventSuscriber;
//# sourceMappingURL=eventSuscriber.js.map