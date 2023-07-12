import mysql from 'mysql';
import dotenv from 'dotenv'

dotenv.config()


const connection = mysql.createConnection({
    host: "localhost",
    user: process.env.DBUSERNAME,
    password: process.env.DBPASSWORD,
    database: process.env.DATABASE,
    port: 3306
});

connection.connect((err) => {
    if(err) {
        console.log("Database conection failed!", err)
    }
    else {
        console.log("Database connected successfully!")
    }
})

export default connection;