// Type definitions for forms
// Project: https://github.com/caolan/forms
// Definitions by: Cédric LOMBARDOT <cedric@donkeycode.com>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

declare module 'forms' {
	var forms: FormsStatic;

	export = forms;
}

interface FormsStatic {

    fields: Forms.Fields;

	validators: Forms.Validators;

    create(fields: Forms.FieldsOptions, opts?:Forms.FormOptions): Forms.Instance;


}


declare module Forms {
    interface FieldsOptions {

    }

    interface Fields {
        string(options?:any):Forms.Field
        number(options?:any):Forms.Field
        boolean(options?:any):Forms.Field
        email(options?:any):Forms.Field
        tel(options?:any):Forms.Field
        password(options?:any):Forms.Field
        url(options?:any):Forms.Field
        array(options?:any):Forms.Field
        date(options?:any):Forms.Field
        object(options?:any):Forms.Field
    }

	interface Validators {
		required(message?:string):Function
		matchField(match_field:string, message?:string):Function
		matchValue(valueGetter:Function, message?:string):Function
		requiresFieldIfEmpty(alternate_field:string, message?:string):Function
		min(val:number,message?:string):Function
		max(val:number,message?:string):Function
		minlength(val:number,message?:string):Function
		maxlength(val:number,message?:string):Function
		rangelength(min:number, max:number,message?:string):Function
		regexp(regex:string,message?:string):Function
		color(message?:string):Function
		email(message?:string):Function
		url(include_localhost:boolean, message?:string):Function
		date(message?:string):Function
		alphanumeric(message?:string):Function
		digits(message?:string):Function
		integer(message?:string):Function
	}

    interface Field {
        parse(raw_data:any)
        bind(raw_data:any)
        errorHTML():string
        labelText(name:string):string
        labelHTML(name:string, id:string):string
        classes():[string]
        toHTML(name?:string, iterator?:any):string
    }

    interface FormOptions {

    }

    interface FormAnswer {
        data:any,
        toHTML():string
    }

    interface Instance {
        handle(req:any, responseOptions: {
            success: Function;
            error: Function;
            empty: Function;
        });
    }
}
