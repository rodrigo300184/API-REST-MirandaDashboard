"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectQuery = exports.createDatabaseIfNotExists = void 0;
const mysql = require('mysql2/promise');
require("dotenv/config");
const userSQL = process.env.USER_SQL;
const databaseSQL = process.env.DATABASE_SQL;
const passwordSQL = process.env.PASSWORD_SQL;
const createDatabaseIfNotExists = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Conectarse al servidor MySQL sin seleccionar una base de datos.
        const connection = yield mysql.createConnection({
            port: 33061,
            host: '127.0.0.1',
            user: userSQL,
            password: passwordSQL,
        });
        // Ejecutar consulta para crear la base de datos si no existe.
        yield connection.query(`CREATE DATABASE IF NOT EXISTS ${databaseSQL}`);
        // Cerrar la conexión sin seleccionar una base de datos.
        yield connection.end();
    }
    catch (error) {
        console.error('Error al crear o seleccionar la base de datos:', error);
        throw error;
    }
});
exports.createDatabaseIfNotExists = createDatabaseIfNotExists;
// Llamar a la función createDatabaseIfNotExists al iniciar la aplicación
(0, exports.createDatabaseIfNotExists)();
const pool = mysql.createPool({
    port: 33061,
    host: '127.0.0.1',
    user: userSQL,
    database: databaseSQL,
    password: passwordSQL,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});
const selectQuery = (query, values = []) => __awaiter(void 0, void 0, void 0, function* () {
    const [result] = yield pool.execute(query, values);
    return result;
});
exports.selectQuery = selectQuery;
//# sourceMappingURL=api_connection.js.map