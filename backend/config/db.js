const mysql = require('mysql2');
const config = require('./config');

const pool = mysql.createPool({
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  port: config.database.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

module.exports = {
  connect: async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to database.');
      connection.release();
    } catch (err) {
      console.error('Database connection failed: ' + err.stack);
      throw err;
    }
  },
  query: (sql, values) => pool.query(sql, values)
};