const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(cors({
    origin: '*', // Accept requests from all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Optional: specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Optional: specify allowed headers
  }));
  
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Yashsri10",
    database: "shopping_db" 
});

db.connect(err => {
  if (err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to MySQL database.');
  }
});
app.get('/', (req, res) => {
    res.send('Welcome to the Shopping API!');
});
// Add this after your other routes

app.post('/purchase', (req, res) => {
  const { user_id, items } = req.body; // items = [{ product_id, quantity }]

  // Step 1: Create new cart
  const createCartQuery = "INSERT INTO carts (user_id) VALUES (?)";
  db.query(createCartQuery, [user_id], (err, cartResult) => {
    if (err) return res.status(500).send({ error: 'Failed to create cart', details: err });

    const cart_id = cartResult.insertId;

    // Step 2: Insert each item into cart_items
    const insertItemsQuery = "INSERT INTO cart_items (cart_id, product_id, quantity) VALUES ?";
    const values = items.map(item => [cart_id, item.product_id, item.quantity]);

    db.query(insertItemsQuery, [values], (err, itemsResult) => {
      if (err) return res.status(500).send({ error: 'Failed to insert items', details: err });

      res.send({ message: 'Purchase recorded successfully!', cart_id });
    });
  });
});

// Signup route
app.post('/signup', (req, res) => {
  const { name, email, password } = req.body;
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, password], (err, result) => {
    if (err) {
      return res.status(500).send({ error: 'Signup failed', details: err });
    }
    res.send({ message: 'User registered successfully!' });
  });
});
// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
  db.query(sql, [email, password], (err, results) => {
    if (err) {
      return res.status(500).send({ error: 'Login failed', details: err });
    }

    if (results.length > 0) {
      // Login successful
      const user = results[0];
      res.send({
        message: 'Login successful!',
        user: {
          id: user.user_id,
          name: user.name,
          email: user.email
        }
      });
    } else {
      // No matching user found
      res.status(401).send({ error: 'Invalid email or password' });
    }
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
