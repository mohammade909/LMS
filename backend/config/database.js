const dotenv = require("dotenv");
const mysql = require('mysql2');
dotenv.config({path:'../config/config.env'});
const connection = mysql.createConnection({
  host:'localhost',
  user: 'root',
  password: '123456',
  database:  'learning_management_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});


 connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});
module.exports = connection;
