const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 5000;
const JWT_SECRET = "my_super_secret_123";

app.use(cors());
app.use(express.json());

// SQLite setup
const db = new sqlite3.Database("./todo.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT,
  email TEXT UNIQUE,
  password TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER,
  name TEXT,
  color TEXT,
  status TEXT,
  FOREIGN KEY(user_id) REFERENCES users(id)
)`);

// JWT middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  console.log("Received token:", token); // Debug

  if (!token) return res.sendStatus(401);

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.log("JWT ERROR:", err.message);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
}

// Register
app.post("/api/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const hashed = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
    [username, email, hashed],
    function (err) {
      if (err) return res.status(400).json({ message: "User already exists" });
      res.status(201).json({ message: "Registered" });
    }
  );
});

// Login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (err || !user)
      return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: "2h",
    });

    res.json({ token, username: user.username });
  });
});

// Get tasks
app.get("/api/tasks", authenticateToken, (req, res) => {
  db.all(
    `SELECT * FROM tasks WHERE user_id = ?`,
    [req.user.id],
    (err, rows) => {
      if (err) return res.status(500).json({ message: "DB error" });
      res.json(rows);
    }
  );
});

// Add task
app.post("/api/tasks", authenticateToken, (req, res) => {
  const { name, color } = req.body;
  if (!name) return res.status(400).json({ message: "Missing task name" });

  db.run(
    `INSERT INTO tasks (user_id, name, color, status) VALUES (?, ?, ?, 'do')`,
    [req.user.id, name, color || "gray"],
    function (err) {
      if (err) return res.status(500).json({ message: "Insert error" });
      res.json({ id: this.lastID });
    }
  );
});

// Mark as done
app.put("/api/tasks/:id", authenticateToken, (req, res) => {
  db.run(
    `UPDATE tasks SET status = 'done' WHERE id = ? AND user_id = ?`,
    [req.params.id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ message: "Update error" });
      res.json({ updated: this.changes });
    }
  );
});

// Edit task
app.put("/api/tasks/edit/:id", authenticateToken, (req, res) => {
  const { name, color } = req.body;
  if (!name || !color)
    return res.status(400).json({ message: "Missing fields" });

  db.run(
    `UPDATE tasks SET name = ?, color = ? WHERE id = ? AND user_id = ?`,
    [name, color, req.params.id, req.user.id],
    function (err) {
      if (err) return res.status(500).json({ message: "Edit error" });
      res.json({ updated: this.changes });
    }
  );
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
