// Type definitions for forms
// Project: https://github.com/othiym23/node-continuation-local-storage
// Definitions by: Cédric LOMBARDOT <cedric@donkeycode.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'continuation-local-storage' {
    var ContinuousLocalStorage: ContinuousLocalStorage;

	export = ContinuousLocalStorage;
}

interface ContinuousLocalStorage {
    createNamespace(name:string):ContinuousLocalStorageNamespace
    destroyNamespace(name:string)
    reset()
}

interface ContinuousLocalStorageNamespace {
    set(key:string, value:any):void
    get(key:string)
    run(callback:any)
}
