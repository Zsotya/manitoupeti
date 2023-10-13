const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer konfigurálása
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../frontend/public/images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// GET REQUEST KEZELÉSE - Összes nehézgép lekérdezése

router.get("/api/machines", (req, res) => {
  db.query("SELECT * FROM machines", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// POST REQUEST KEZELÉSE - Új nehézgép létrehozása

router.post("/api/machines", upload.single("image"), (req, res) => {
  const {
    machine_name,
    max_height,
    max_weight,
    has_sole,
    sole_count,
    has_basket,
    has_fork,
    is_remote,
    price_per_day,
  } = req.body;

  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).json({ error: "Image file is required" });
    return;
  }

  const imageUrl = `/images/${imageFile.filename}`;
  const sql =
    "INSERT INTO machines (machine_name, max_height, max_weight, has_sole, sole_count, has_basket, has_fork, is_remote, price_per_day, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      machine_name,
      max_height,
      max_weight,
      has_sole,
      sole_count,
      has_basket,
      has_fork,
      is_remote,
      price_per_day,
      imageUrl,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting into the database:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      res.status(201).json({ message: "Machine created successfully" });
    }
  );
});

// DELETE REQUEST KEZELÉSE - Nehézgép törlése

router.delete("/api/machines/:id", (req, res) => {
  const machineId = req.params.id;

  db.query("DELETE FROM machines WHERE id = ?", [machineId], (err, result) => {
    if (err) {
      console.error("Error deleting from the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json({ message: "Machine deleted successfully" });
  });
});

module.exports = router;
