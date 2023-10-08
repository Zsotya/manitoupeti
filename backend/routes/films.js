const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer konfigurálása
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Mivel nincs error, az első arg-nak null-t adunk
    cb(null, path.join(__dirname, "../../frontend/public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET REQUEST KEZELÉSE - Filmek listázása

router.get("/api/films", (req, res) => {
  db.query("SELECT * FROM films", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// POST REQUEST KEZELÉSE - Új film létrehozása

router.post("/api/films", upload.single("image"), (req, res) => {
  const { title_hu, title_en, description_hu, description_en } = req.body;

  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).json({ error: "Image file is required" });
    return;
  }

  const imageUrl = `/images/${imageFile.filename}`;
  const sql =
    "INSERT INTO films (title_hu, title_en, description_hu, description_en, image_url) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title_hu, title_en, description_hu, description_en, imageUrl],
    (err, result) => {
      if (err) {
        console.error("Error inserting into the database:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      res.status(201).json({ message: "Film created successfully" });
    }
  );
});

// DELETE REQUEST KEZELÉSE - Film törlése
router.delete("/api/films/:id", (req, res) => {
  const filmId = req.params.id;

  db.query("DELETE FROM films WHERE id = ?", [filmId], (err, result) => {
    if (err) {
      console.error("Error deleting from the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json({ message: "Film deleted successfully" });
  });
});

module.exports = router;
