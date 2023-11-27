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

/* REQUESTEK KEZELÉSE */

// Összes film listázása - GET
router.get("/api/films", (req, res) => {
  // Lekérdezés
  db.query(
    "SELECT * FROM films",
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba az adatok lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json(results);
    }
  );
});

// Egy adott film lekérdezése adott azonosító alapján - GET
router.get("/api/films/:id", (req, res) => {
  // Azonosító meghatározása
  const filmId = req.params.id;
  // Lekérdezés
  db.query(
    "SELECT * FROM films WHERE id = ?",
    [filmId],
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba az adatok lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // 404 kezelés
      if (results.length === 0) {
        res.status(404).json({ error: "Nincs ilyen film" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Új film létrehozása - POST
router.post("/api/films", upload.single("image"), (req, res) => {
  // Értékek meghatározása
  const { title_hu, title_en, description_hu, description_en } = req.body;

  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).json({ error: "Képfájl megadása kötelező" });
    return;
  }

  // Beszúrás az adatbázisba
  const imageUrl = `/images/${imageFile.filename}`;
  const sql =
    "INSERT INTO films (title_hu, title_en, description_hu, description_en, image_url) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title_hu, title_en, description_hu, description_en, imageUrl],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba az adatok lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.status(201).json({ message: "Film sikeresen létrehozva" });
    }
  );
});

// Film módosítása - PUT
router.put("/api/films/:id", upload.single("image"), (req, res) => {
  // Azonosító meghatározása
  const filmId = req.params.id;
  // Értékek meghatározása
  const { title_hu, title_en, description_hu, description_en, image } =
    req.body;
  const imageFile = req.file;
  let imageUrl = "";

  // Amennyiben került új fájl megadásra
  if (imageFile) {
    imageUrl = `/images/${imageFile.filename}`;
  } else {
    imageUrl = image; // Ha nincs fájl, akkor a korábbi URL-t kapja
  }

  // Adatok frissítése az adatbázisban
  const sql =
    "UPDATE films SET title_hu=?, title_en=?, description_hu=?, description_en=?, image_url=? WHERE id=?";
  const values = [
    title_hu,
    title_en,
    description_hu,
    description_en,
    imageUrl,
    filmId,
  ];
  db.query(
    sql,
    values,
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba az adatbázis frissítésekor:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.status(200).json({ message: "Film sikeresen frissíítve" });
    }
  );
});

// Film törlése - DELETE
router.delete("/api/films/:id", (req, res) => {
  // Azonosító meghatározása
  const filmId = req.params.id;
  // Törlés az adatbázisból
  db.query(
    "DELETE FROM films WHERE id = ?",
    [filmId],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba a törlés során:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json({ message: "Film sikeresen törölve" });
    }
  );
});

module.exports = router;
