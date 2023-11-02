"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
require("dotenv/config");
const port = process.env.PORT;
app_1.app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
//# sourceMappingURL=server.js.map