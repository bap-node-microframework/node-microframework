
export function EventListener(...getArgs) {
    let eventName = getArgs[0];

    return function(target, name, descriptor) {
        target.constructor.eventListeners[eventName] = descriptor.value;
    }
}
