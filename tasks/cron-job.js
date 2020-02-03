require('dotenv').config();
const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
const dbPool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA || 'test_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

(async () => {
  const sql = 'INSERT INTO test_table (value) VALUES (?);';
  const args = [`${new Date().toISOString().split('T')}-${process.env.HOSTNAME}`];
  const [result] = await dbPool.query(sql, args);
  console.log('affectedRows', result.affectedRows);
  process.exit(0);
})();
