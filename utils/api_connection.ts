const mysql = require('mysql2/promise');
import 'dotenv/config';

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
  maxIdle: 10, 
  idleTimeout: 60000,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

export const selectQuery = async (query: string, values: any[] = []) => {
    const [result] = await pool.execute(query,values);
    return result;

}
