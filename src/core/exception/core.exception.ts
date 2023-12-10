export class CoreException extends Error {
    public code: number;
    public publicMessage: string;
    constructor(message, code = null, publicMessage = '') {
        super(message);
        //omit all of the stack frames invoked by code inside
        Error.captureStackTrace(this, this.constructor);
        //to make our class name apper in stack trace
        this.name = this.constructor.name;
        this.code = code;
        this.publicMessage = publicMessage;
    }


}