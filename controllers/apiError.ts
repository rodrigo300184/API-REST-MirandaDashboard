export class ApiError extends Error {
    status: number;
    message: string;
    safe: boolean;

    constructor(status: number, message: string, safe: boolean = false) {
        super(message);
        this.status = status;
        this.message = message;
        this.safe = safe;
    }
}
