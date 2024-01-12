const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer konfigurálása
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Mivel nincs error, az első arg-nak null-t adunk
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

/* REQUESTEK KEZELÉSE */

// Összes bemutatkozás elem lekérdezése - GET
router.get("/api/aboutus", (req, res) => {
  // Lekérdezés
  db.query(
    "SELECT * FROM aboutus",
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

// Egy adott bemutatkozás elem lekérdezése adott azonosító alapján - GET
router.get("/api/aboutus/:id", (req, res) => {
  // Azonosító meghatározása
  const aboutusId = req.params.id;
  // Lekérdezés
  db.query(
    "SELECT * FROM aboutus WHERE id = ?",
    [aboutusId],
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba az adatok lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // 404 kezelés
      if (results.length === 0) {
        res.status(404).json({ error: "Nincs ilyen bemutatkozás elem" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Új bemutatkozás elem létrehozása - POST
router.post("/api/aboutus", upload.single("image"), (req, res) => {
  // Értékek meghatározása
  const { title_hu, title_en, content_hu, content_en } = req.body;

  const imageFile = req.file;
  if (!imageFile) {
    res.status(400).json({ error: "Képfájl megadása kötelező!" });
    return;
  }

  // Beszúrás adatbázisba
  const imageUrl = `/images/${imageFile.filename}`;
  const sql =
    "INSERT INTO aboutus (title_hu, title_en, content_hu, content_en, image_url) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title_hu, title_en, content_hu, content_en, imageUrl],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba az adatbázisba beszúrás közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res
        .status(201)
        .json({ message: "Bemutatkozás elem sikeresen létrehozva" });
    }
  );
});

// Bemutatkozás elem módosítása - PUT
router.put("/api/aboutus/:id", upload.single("image"), (req, res) => {
  // Azonosító meghatározása
  const aboutusId = req.params.id;
  // Értékek meghatározása
  const { title_hu, title_en, content_hu, content_en, image } = req.body;
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
    "UPDATE aboutus SET title_hu=?, title_en=?, content_hu=?, content_en=?, image_url=? WHERE id=?";
  const values = [
    title_hu,
    title_en,
    content_hu,
    content_en,
    imageUrl,
    aboutusId,
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
      res
        .status(200)
        .json({ message: "Bemutatkozás elem sikeresen frissíítve" });
    }
  );
});

// Bemutatkozás elem törlése - DELETE
router.delete("/api/aboutus/:id", (req, res) => {
  // Azonosító meghatározása
  const aboutusId = req.params.id;
  // Törlés az adatbázisból
  db.query(
    "DELETE FROM aboutus WHERE id = ?",
    [aboutusId],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba a törlés során:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json({ message: "Bemutatkozás elem sikeresen törölve" });
    }
  );
});

module.exports = router;
