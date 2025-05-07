import mysql from 'mysql2';

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yashsri10",
    database: "shopping_db" // ← changed from "employeems" to "shopping_db"
});

con.connect(function(err) {
    if (err) {
        console.log("Connection error:", err);
    } else {
        console.log("Connected to shopping_db!");
    }
});

export default con;
