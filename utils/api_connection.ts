const mysql = require('mysql2/promise');
import 'dotenv/config';

// Create the connection pool. The pool-specific settings are the defaults
const userSQL = process.env.USER_SQL;
const databaseSQL = process.env.DATABASE_SQL;
const passwordSQL = process.env.PASSWORD_SQL;

const pool = mysql.createPool({
  host: 'localhost',
  user: userSQL,
  database:databaseSQL,
  password: passwordSQL,
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});