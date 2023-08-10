const mysql = require('mysql2');

const pool = mysql.createPool({
    user: 'root',
    host: 'localhost',
    database: 'node_complete',
    password: 'ajagbeejo1'
});


module.exports = pool.promise();