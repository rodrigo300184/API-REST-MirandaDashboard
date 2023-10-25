"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function authMiddleware(req, res, next) {
    let headerVal = req.get('Authorization');
    if (!headerVal)
        return res.status(401).json({ error: true, message:  });
}
exports.default = authMiddleware;
//# sourceMappingURL=auth.js.map