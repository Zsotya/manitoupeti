const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");

// Multer konfigurálása
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Vizsgálás, hogy a fájl pdf vagy kép
    const folder = file.fieldname === "pdf" ? "pdfs" : "images";
    cb(null, path.join(__dirname, `../${folder}`));
  },
  filename: function (req, file, cb) {
    // PDF fájl neve legyen dátum + eredeti név
    if (file.fieldname === "pdf") {
      cb(null, file.originalname);
    } else {
      // Képfájl esetén egyedi név generálás
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    }
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
router.post(
  "/api/machines",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  (req, res) => {
    // Értékek meghatározása
    const {
      machine_name,
      max_height,
      max_weight,
      has_basket,
      has_fork,
      has_rotohead,
      has_winch,
    } = req.body;

    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const pdfFile = req.files["pdf"] ? req.files["pdf"][0] : null;

    // Képfájl ellenőrzése
    if (!imageFile) {
      res.status(400).json({ error: "Képfájl megadása kötelező!" });
      return;
    }

    // PDF fájl ellenőrzése
    if (
      pdfFile &&
      path.extname(pdfFile.originalname).toLowerCase() !== ".pdf"
    ) {
      res.status(400).json({ error: "Érvénytelen PDF fájlformátum!" });
      return;
    }

    // Beszúrás adatbázisba
    const imageUrl = `/images/${imageFile.filename}`;
    const pdfUrl = pdfFile ? `/pdfs/${pdfFile.filename}` : null;

    const sql =
      "INSERT INTO machines (machine_name, max_height, max_weight, has_basket, has_fork, has_rotohead, has_winch, image_url, pdf_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      sql,
      [
        machine_name,
        max_height,
        max_weight,
        has_basket,
        has_fork,
        has_rotohead,
        has_winch,
        imageUrl,
        pdfUrl,
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
  }
);

// Nehézgép módosítása - PUT
router.put(
  "/api/machines/:id",
  upload.fields([{ name: "image" }, { name: "pdf" }]),
  (req, res) => {
    // Azonosító meghatározása
    const machineId = req.params.id;
    // Értékek meghatározása
    const {
      machine_name,
      max_height,
      max_weight,
      has_basket,
      has_fork,
      has_rotohead,
      has_winch,
      image,
    } = req.body;

    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const pdfFile = req.files["pdf"] ? req.files["pdf"][0] : null;

    let imageUrl = "";
    let pdfUrl = "";

    // Amennyiben került új fájl megadásra
    if (imageFile) {
      imageUrl = `/images/${imageFile.filename}`;
    } else {
      imageUrl = image; // Ha nincs fájl, akkor a korábbi URL-t kapja
    }

    // Amennyiben került új PDF fájl megadásra
    if (pdfFile) {
      pdfUrl = `/pdfs/${pdfFile.filename}`;
    } else {
      pdfUrl = req.body.pdf; // Ha nincs új PDF fájl, akkor a korábbi URL-t kapja
    }

    // Adatok frissítése az adatbázisban
    const sql =
      "UPDATE machines SET machine_name=?, max_height=?, max_weight=?, has_basket=?, has_fork=?, has_rotohead=?, has_winch=?, image_url=?, pdf_url=? WHERE id=?";
    const values = [
      machine_name,
      max_height,
      max_weight,
      has_basket,
      has_fork,
      has_rotohead,
      has_winch,
      imageUrl,
      pdfUrl,
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
  }
);

// Nehézgép törlése - DELETE
// Megjegyzés: Csak olyan nehézgép törölhető, amire nincs historikus foglalás létrehozva (az id-jével nem szerepel rekort a bookings és archive_bookings táblában)
// Terv: soft-delete megoldás, azaz egy "deleted" oszlop hozzáadása a machines táblához. Ennek igaz értéke alapján jelenítené meg az adatokat a frontend
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
