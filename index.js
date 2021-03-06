const fs = require('fs');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
require('dotenv').config();
const mysql = require('mysql2');

const PORT = 3000;

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

const app = express();
app.use(morgan('tiny'));

app.get('/', async (req, res) => {
  const lines = [
    'Hello Kubernetes! (-:',
    `Hostname: ${process.env.HOSTNAME}`,
    '',
    'DB contents:',
  ];
  const [rows] = await dbPool.query('SELECT * FROM test_table;');
  rows.forEach((row) => {
    lines.push(JSON.stringify(row));
  });

  try {
    fs.writeFileSync(path.join('/app/storage', `${new Date().toISOString().split('T')}-${process.env.HOSTNAME}`), 'It\'s working!!!!');
  } catch (error){
    console.error(error);
  }

  if (fs.existsSync('/app/storage')) {
    lines.push('', 'Dir contents:');

    fs.readdirSync('/app/storage').forEach((file) => {
      lines.push(file);
    });
  }

  res.send(
    `<pre>${lines.join('\n')}</pre>`,
  );
});

app.listen(PORT, () => {
  console.log(`App is listening at port ${PORT}`);
});
