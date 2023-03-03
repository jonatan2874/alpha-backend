const mysql = require('mysql');

const connection =  mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }

  console.log('mysql database connection successfully with id ' + connection.threadId);
});

const query = async (sql, params, callback) => {
    return await connection.query(sql, params, callback);
}
  
  module.exports = {
        query
    }