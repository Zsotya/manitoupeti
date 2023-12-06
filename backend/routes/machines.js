const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer konfigurálása
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

/* REQUESTEK KEZELÉSE */

// Összes nehézgép lekérdezése - GET
router.get("/api/machines", (req, res) => {
  // Lekérdezés
  db.query(
    "SELECT * FROM machines",
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

// Egy adott nehézgép lekérdezése adott azonosító alapján - GET
router.get("/api/machines/:id", (req, res) => {
  // Azonosító meghatározása
  const machineId = req.params.id;
  // Lekérdezés
  db.query(
    "SELECT * FROM machines WHERE id = ?",
    [machineId],
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba az adatok lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // 404 kezelés
      if (results.length === 0) {
        res.status(404).json({ error: "Nincs ilyen nehézgép" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Új nehézgép létrehozása - POST
router.post("/api/machines", upload.single("image"), (req, res) => {
  // Értékek meghatározása
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
    res.status(400).json({ error: "Képfájl megadása kötelező!" });
    return;
  }

  // Beszúrás adatbázisba
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
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba az adatbázisba beszúrás közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.status(201).json({ message: "Nehézgép sikeresen létrehozva" });
    }
  );
});

// Nehézgép módosítása - PUT
router.put("/api/machines/:id", upload.single("image"), (req, res) => {
  // Azonosító meghatározása
  const machineId = req.params.id;
  // Értékek meghatározása
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
    image,
  } = req.body;
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
    "UPDATE machines SET machine_name=?, max_height=?, max_weight=?, has_sole=?, sole_count=?, has_basket=?, has_fork=?, is_remote=?, price_per_day=?, image_url=? WHERE id=?";
  const values = [
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
    machineId,
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
      res.status(200).json({ message: "Nehézgép sikeresen frissíítve" });
    }
  );
});

// Nehézgép törlése - DELETE
router.delete("/api/machines/:id", (req, res) => {
  // Azonosító meghatározása
  const machineId = req.params.id;
  // Törlés az adatbázisból
  db.query(
    "DELETE FROM machines WHERE id = ?",
    [machineId],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba a törlés során:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json({ message: "Nehézgép sikeresen törölve" });
    }
  );
});

module.exports = router;
