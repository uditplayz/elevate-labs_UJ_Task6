const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname)));

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  ssl: { rejectUnauthorized: false }
});

app.get("/api/projects", async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, domain, score FROM students ORDER BY id ASC LIMIT 10");
    res.json(result.rows);
  } catch (err) {
    console.error("DB error:", err.message);
    res.status(500).json({ error: "Database error" });
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
