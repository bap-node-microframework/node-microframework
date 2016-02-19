
export abstract class EventSuscriber {
    static eventListeners:any = {}

    static registerEventListeners(dispatcher) {
        for (var event in this.eventListeners) {
            let on = this.eventListeners[event];

            dispatcher.on(event, function onEvent() {
                var mainArguments = Array.prototype.slice.call(arguments);
                mainArguments.push(dispatcher);

                on.apply(null, mainArguments);
            });
        }
    }
}
