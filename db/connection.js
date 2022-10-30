const mysql = require('mysql2');
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'employee',
        password: 'pass@123',
        database: 'business'
    },
    console.log('Connected to the business database.')
);

module.exports = db;