const mysql = require('mysql2')

const connectToMySQL = async () => {
    const conn = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
    });

    conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    });
};

module.exports = connectToMySQL;