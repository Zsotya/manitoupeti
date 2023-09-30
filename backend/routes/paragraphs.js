const express = require("express");
const router = express.Router();
const db = require("../db"); // Adatbázis modul importálása

// paragraphs végpont kezelése
router.get("/api/paragraphs", (req, res) => {
  db.query(
    "SELECT paragraphs.*, images.path AS image_path FROM paragraphs JOIN images ON paragraphs.image_id = images.id",
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

module.exports = router;
