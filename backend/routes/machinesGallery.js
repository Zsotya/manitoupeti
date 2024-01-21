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

// Adott nehézgép összes galériaelemének lekérdezése, sorszám alapján növekvő sorrendben
router.get("/api/machines/gallery/:machineId", (req, res) => {
  // Azonosító meghatározása
  const machineId = req.params.machineId;
  // Adatbázis lekérdezés
  db.query(
    "SELECT * FROM machines_gallery WHERE machine_id = ? ORDER BY `order` ASC",
    [machineId],
    (err, results) => {
      // Hibakezelés
      if (err) {
        console.error("Hiba a lekérdezés közben:", err);
        res.status(500).json({ error: "Adatbázis hiba", err });
        return;
      }
      res.json(results);
    }
  );
});

// Adott nehézgéphez új galériaelem létrehozása
router.post(
  "/api/machines/gallery/:machineId",
  upload.single("image"),
  (req, res) => {
    // Azonosító meghatározása
    const machineId = req.params.machineId;

    // Képfájl
    const imageFile = req.file;
    if (!imageFile) {
      res.status(400).json({ error: "Nincs megadva képfájl" });
      return;
    }

    // A legnagyobb sorszám megkeresése
    db.query(
      "SELECT MAX(`order`) as maxOrder FROM machines_gallery WHERE machine_id = ?",
      [machineId],
      (err, results) => {
        if (err) {
          console.error("Hiba a maximum kiszámítása közben: ", err);
          res.status(500).json({ error: "Adatbázis hiba" });
          return;
        }

        const newOrder = results[0]?.maxOrder + 1 || null;

        // Adatbázisba illesztés
        db.query(
          "INSERT INTO machines_gallery (machine_id, image_url, `order`) VALUES (?, ?, ?)",
          [machineId, `/images/${imageFile.filename}`, newOrder],
          (insertErr) => {
            if (insertErr) {
              console.error("Hiba a kép beszúrása közben:", insertErr);
              res.status(500).json({ error: "Adatbázis hiba" });
              return;
            }
            res.status(201).json({ message: "Képfeltöltés sikeres" });
          }
        );
      }
    );
  }
);

// Sorrend módosítása
router.put("/api/machines/gallery/:machineId/changeOrder", (req, res) => {
  const machineId = req.params.machineId;
  const { imageId, newOrder } = req.body;

  // Validálás
  if (isNaN(newOrder) || newOrder < 1 || isNaN(imageId) || imageId < 1) {
    res.status(400).json({ error: "Hibás paraméter" });
    return;
  }

  // Adatbázis módosítás
  db.query(
    "UPDATE machines_gallery SET `order` = ? WHERE id = ? AND machine_id = ?",
    [newOrder, imageId, machineId],
    (updateErr) => {
      // Hibakezelés
      if (updateErr) {
        console.error("Hiba a kép sorrendjének módosítása közben:", updateErr);
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

// Galéria elem törlése
router.delete("/api/machines/gallery/:machineId/:imageId", (req, res) => {
  // Azonosító meghatározása
  const { imageId } = req.params;
  // Törlés az adatbázisból
  try {
    db.query("DELETE FROM machines_gallery WHERE id = ?", [imageId]);
    res.status(200).json({ message: "Kép törlése sikeres" });
  } catch (error) {
    // Hibakezelés
    console.error("Hiba a kép törlése közben:", error);
    res.status(500).json({ error: "Adatbázis hiba" });
  }
});

module.exports = router;
