"use strict";
var EventSubscriber = (function () {
    function EventSubscriber() {
    }
    EventSubscriber.registerEventListeners = function (dispatcher) {
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
    EventSubscriber.eventListeners = {};
    return EventSubscriber;
}());
exports.EventSubscriber = EventSubscriber;
//# sourceMappingURL=eventSubscriber.js.map