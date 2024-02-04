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

// Összes paragrafus lekérdezése - GET
router.get("/api/paragraphs", (req, res) => {
  // Lekérdezés
  db.query(
    "SELECT * FROM paragraphs ORDER BY `order` ASC",
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

// Egy adott paragrafus lekérdezése adott azonosító alapján - GET
router.get("/api/paragraphs/:id", (req, res) => {
  // Azonosító meghatározása
  const paragraphId = req.params.id;
  // Lekérdezés
  db.query(
    "SELECT * FROM paragraphs WHERE id = ?",
    [paragraphId],
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba az adatok lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // 404 kezelés
      if (results.length === 0) {
        res.status(404).json({ error: "Nincs ilyen paragrafus" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Új paragrafus létrehozása - POST
router.post("/api/paragraphs", upload.single("image"), (req, res) => {
  // Értékek meghatározása
  const { title_hu, title_en, content_hu, content_en } = req.body;
  const imageFile = req.file;
  // Hiányzó képfájl
  if (!imageFile) {
    res.status(400).json({ error: "Képfájl megadása kötelező!" });
    return;
  }

  /* Beszúrás adatbázisba */
  // Kép címének meghatározása
  const imageUrl = `/images/${imageFile.filename}`;
  // Lekérdezés
  const sql =
    "INSERT INTO paragraphs (title_hu, title_en, content_hu, content_en, image_url) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [title_hu, title_en, content_hu, content_en, imageUrl],
    (err, res) => {
      // Hibakezelés
      if (err) {
        console.error("Hiba az adatbázisba beszúrás közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // Sikeres létrehozás esetén válasz a kliensnek
      res.status(201).json({ message: "Paragrafus sikeresen létrehozva" });
    }
  );
});

// Paragrafus módosítása - PUT
router.put("/api/paragraphs/:id", upload.single("image"), (req, res) => {
  // Azonosító meghatározása
  const paragraphId = req.params.id;
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
    "UPDATE paragraphs SET title_hu=?, title_en=?, content_hu=?, content_en=?, image_url=? WHERE id=?";
  const values = [
    title_hu,
    title_en,
    content_hu,
    content_en,
    imageUrl,
    paragraphId,
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
      res.status(200).json({ message: "Paragrafus sikeresen frissíítve" });
    }
  );
});

// Paragrafus törlése - DELETE
router.delete("/api/paragraphs/:id", (req, res) => {
  // Azonosító meghatározása
  const paragraphId = req.params.id;
  // Törlés az adatbázisból
  db.query(
    "DELETE FROM paragraphs WHERE id = ?",
    [paragraphId],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba a törlés során:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json({ message: "Paragrafus sikeresen törölve" });
    }
  );
});

// Sorrend módosítása - PUT
router.put("/api/paragraphs/:paragraphId/changeOrder", (req, res) => {
  const paragraphId = req.params.paragraphId;
  const { newOrder } = req.body;

  // Validálás
  if (isNaN(newOrder) || newOrder < 1) {
    res.status(400).json({ error: "Hibás paraméter" });
    return;
  }

  // Adatbázis módosítás
  db.query(
    "UPDATE paragraphs SET `order` = ? WHERE id = ?",
    [newOrder, paragraphId],
    (updateErr) => {
      // Hibakezelés
      if (updateErr) {
        console.error(
          "Hiba a paragrafus sorrendjének módosítása közben:",
          updateErr
        );
        res
          .status(500)
          .json({ error: "Adatbázis hiba:", details: updateErr.message });
        return;
      }
      // Sikeres módosítás
      res.status(201).json({ message: "Sorrendmódosítás sikeres" });
    }
  );
});

module.exports = router;
