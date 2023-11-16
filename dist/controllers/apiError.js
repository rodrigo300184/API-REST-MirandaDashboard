"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message, safe = false) {
        super(message);
        this.status = status;
        this.message = message;
        this.safe = safe;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=apiError.js.map