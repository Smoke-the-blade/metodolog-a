const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '12345', // ajustá tu contraseña
  database: 'saludtotal'
});

module.exports = pool;
