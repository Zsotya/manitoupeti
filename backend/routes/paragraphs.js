const express = require("express");
const router = express.Router();
const db = require("../db"); // Adatbázis modul importálása

// paragraphs végpont kezelése
router.get("/api/paragraphs", (req, res) => {
  db.query("SELECT * FROM paragraphs", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
