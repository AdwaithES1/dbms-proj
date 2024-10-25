const mysql = require('mysql2')
require('dotenv').config()

const pool = mysql.createPool({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
})

pool.getConnection((err, conn) => {
    if (err) {
        console.error("Error Connecting To The Database");
    } else {
        console.log("Connected To Database Successfully!");
    }
})

module.exports = pool.promise();

// const conn = require('@supabase/supabase-js')

// const supabaseUrl = process.env.SUPABASE_URL;
// const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

// const supabase = conn.createClient(supabaseUrl, supabaseAnonKey);

// async function getData() {
//     const { data, error } = await supabase
//       .from('users')
//       .select('*');
  
//     if (error) {
//       console.error('Error fetching data:', error);
//     } else {
//       console.log('Data:', data);
//     }
// }
  
// getData();
  

// module.exports = supabase;