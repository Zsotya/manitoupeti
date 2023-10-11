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

// GET REQUEST KEZELÉSE

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

// POST REQUEST KEZELÉSE - Új paragraph létrehozása

router.post("/api/paragraphs", upload.single("image"), (req, res) => {
  const { title_hu, title_en, content_hu, content_en } = req.body;

  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).json({ error: "Image file is required" });
    return;
  }

  const imageUrl = `/images/${imageFile.filename}`;
  const sql =
    "INSERT INTO films (title_hu, title_en, content_hu, content_en, image_url) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title_hu, title_en, content_hu, content_en, imageUrl],
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

// DELETE REQUEST KEZELÉSE - Paragraph törlése
router.delete("/api/paragraphs/:id", (req, res) => {
  const paragraphId = req.params.id;

  db.query(
    "DELETE FROM paragraphs WHERE id = ?",
    [paragraphId],
    (err, result) => {
      if (err) {
        console.error("Error deleting from the database:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      res.json({ message: "Paragraph deleted successfully" });
    }
  );
});

module.exports = router;
