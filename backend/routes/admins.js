const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const mysql = require("mysql2/promise");

// GET REQUEST KEZELÉSE - Adminok listázása (jelszó nélkül!)

router.get("/api/admins", (req, res) => {
  db.query(
    "SELECT id, username, full_name FROM admin_users",
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      res.json(results);
    }
  );
});

// POST REQUEST KEZELÉSE - Új admin létrehozása

router.post("/api/admins", async (req, res) => {
  const { username, password, full_name } = req.body;
  // Jelszó hashelés (admincreator.js alapján)
  const saltRounds = 13;
  try {
    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "manitoupetidb",
    });

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const [result] = await connection.execute(
      "INSERT INTO admin_users (username, password, full_name) VALUES (?, ?, ?)",
      [username, hashedPassword, full_name]
    );

    connection.end();

    res.status(201).json({ message: "Admin user created successfully" });
  } catch (error) {
    console.error("Error creating admin user:", error);
    res.status(500).json({ error: "Error creating admin user" });
  }
});

// DELETE REQUEST KEZELÉSE - Admin eltávolítása

router.delete("/api/admins/:id", async (req, res) => {
  const adminId = req.params.id;

  db.query("DELETE FROM admin_users WHERE id = ?", [adminId], (err, result) => {
    if (err) {
      console.error("Error deleting admin from the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    // Vizsgálat, hogy ténylegesen töröltünk-e elemet
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Admin not found" });
    } else {
      res.json({ message: "Admin deleted successfully" });
    }
  });
});

module.exports = router;
