"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllerError = void 0;
class ControllerError extends Error {
    constructor(status, message, safe = false) {
        super(message);
        this.status = status;
        this.message = message;
        this.safe = safe;
    }
}
exports.ControllerError = ControllerError;
//# sourceMappingURL=controllersError.js.map