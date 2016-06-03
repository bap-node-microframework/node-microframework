
export function EventListener(...getArgs) {
    let eventName = getArgs[0];

    return function(target, name, descriptor) {
        if (!target.constructor.eventListeners) {
            target.constructor.eventListeners = {};
        }

        target.constructor.eventListeners[eventName] = descriptor.value;
    }
}

export function EventSubscriber() {
    return function(target) {
        if (!target.constructor.eventListeners) {
            target.constructor.eventListeners = {};
        }

        target.registerEventListeners = function(dispatcher) {
            for (var event in this.eventListeners) {
                let on = this.eventListeners[event];

                dispatcher.on(event, function onEvent() {
                    var mainArguments = Array.prototype.slice.call(arguments);
                    mainArguments.push(dispatcher);

                    on.apply(null, mainArguments);
                });
            }
        }
    }

}
