// Type definitions for forms
// Project: https://github.com/holidayextras/file-stream-rotator
// Definitions by: Cédric LOMBARDOT <cedric@donkeycode.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'file-stream-rotator' {
    var FileStreamRotator: FileStreamRotator;

	export = FileStreamRotator;
}

interface FileStreamRotator {
    getFrequency(frequency:string):any
    getDate(format:string, date_format:string):any
    getStream(options:Object):any
}
