const express = require("express");
const router = express.Router();
const db = require("../db");
const multer = require("multer");
const path = require("path");
const sharp = require("sharp");

/* Multer konfigurálása */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../bigimages"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Egyedi fájlnév generálása
const generateThumbnailFilename = (originalFilename) => {
  const extension = path.extname(originalFilename);
  const baseName = path.basename(originalFilename, extension);
  return `thumbnail_${baseName}${extension}`;
};

// Összes job listázása - GET
router.get("/api/gallery", (req, res) => {
  // Lekérdezés
  db.query(
    "SELECT * FROM gallery ORDER BY created_at DESC",
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

// Új képek feltöltése - POST
router.post(
  "/api/gallery/upload",
  upload.array("images", 50),
  async (req, res) => {
    // Fájlok inicializálása
    const files = req.files;

    // Ha nincs fájl, kilépés
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "Nem történt képfeltöltés" });
    }

    // Több kép feltöltési lehetőség miatt for-loop
    for (let i = 0; i < files.length; i++) {
      // Eredeti kép inicializálása
      const originalImage = files[i];

      // Bélyegkép nevének létrehozása
      const thumbnailFilename = generateThumbnailFilename(
        originalImage.filename
      );

      // Bélyegkép célhely meghatározása
      const thumbnailPath = path.join(
        __dirname,
        "../thumbnails",
        thumbnailFilename
      );

      // Bélyegkép elkészítése az eredeti képből
      sharp(originalImage.path)
        .resize(200, 200)
        .toFile(thumbnailPath, (err) => {
          if (err) {
            console.error("Hiba a bélyegkép létrehozásakor:", err);
            return res
              .status(500)
              .json({ error: "Hiba a bélyegkép létrehozásakor" });
          }
        });

      // Beszúrás az adatbázisba
      const imageUrl = `/bigimages/${originalImage.filename}`;
      const thumbnailUrl = `/thumbnails/${thumbnailFilename}`;
      const sql =
        "INSERT INTO gallery (big_image_url, thumbnail_url, `order`) VALUES (?, ?, ?)";
      db.query(sql, [imageUrl, thumbnailUrl, "1"], (err, result) => {
        if (err) {
          console.error("Hiba az adatbázisba illesztés közben:", err);
          return res.status(500).json({ error: "Adatbázis hiba" });
        }
      });
    }
    res.status(200).send("Képek sikeresen feltöltve");
  }
);

// Kép törlése - DELETE
router.delete("/api/gallery/:id", (req, res) => {
  // Azonosító meghatározása
  const imageId = req.params.id;
  // Törlés az adatbázisból
  db.query(
    "DELETE FROM gallery WHERE id = ?",
    [imageId],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba a kép törlés során:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json({ message: "Kép sikeresen törölve" });
    }
  );
});

module.exports = router;
