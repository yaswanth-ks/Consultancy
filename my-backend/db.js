const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yashsri10",
    database: "shopping_db" 
});

con.connect(err => {
    if (err) {
        console.error("Database connection failed:", err);
    } else {
        console.log("Connected to MySQL!");
    }
});

// Example route
app.get("/api/carts", (req, res) => {
    con.query("SELECT * FROM carts", (err, results) => {
        if (err) {
            return res.status(500).send("Error fetching carts");
        }
        res.json(results);
    });
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
