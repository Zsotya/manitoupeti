const express = require("express");
const router = express.Router();
const db = require("../db");

/* REQUESTEK KEZELÉSE */

// Összes job listázása - GET
router.get("/api/jobs", (req, res) => {
  // Lekérdezés
  db.query(
    "SELECT * FROM jobs",
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

// Egy adott job lekérdezése azonosító alapján - GET
router.get("/api/jobs/:id", (req, res) => {
  // Azonosító meghatározása
  const jobId = req.params.id;
  // Lekérdezés
  db.query(
    "SELECT * FROM jobs WHERE id = ?",
    [jobId],
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba az adatok lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // 404 kezelés
      if (results.length === 0) {
        res.status(404).json({ error: "Nincs ilyen job" });
        return;
      }
      res.json(results[0]);
    }
  );
});

// Új job létrehozása - POST
router.post("/api/jobs", (req, res) => {
  // Értékek meghatározása
  const {
    jobname_hu,
    jobname_en,
    jobdescription_hu,
    jobdescription_en,
    jobtime_hu,
    jobtime_en,
  } = req.body;

  // Beszúrás az adatbázisba
  const sql =
    "INSERT INTO jobs (jobname_hu, jobname_en, jobdescription_hu, jobdescription_en, jobtime_hu, jobtime_en) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [
      jobname_hu,
      jobname_en,
      jobdescription_hu,
      jobdescription_en,
      jobtime_hu,
      jobtime_en,
    ],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba az adatbázisba beszúrás közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.status(201).json({ message: "Job sikeresen létrehozva" });
    }
  );
});

// Job módosítása - PUT
router.put("/api/jobs/:id", (req, res) => {
  // Azonosító meghatározása
  const jobId = req.params.id;
  // Értékek meghatározása
  const {
    jobname_hu,
    jobname_en,
    jobdescription_hu,
    jobdescription_en,
    jobtime_hu,
    jobtime_en,
  } = req.body;
  // Adatok frissítése az adatbázisban
  const sql =
    "UPDATE jobs SET jobname_hu=?, jobname_en=?, jobdescription_hu=?, jobdescription_en=?, jobtime_hu=?, jobtime_en=? WHERE id=?";
  const values = [
    jobname_hu,
    jobname_en,
    jobdescription_hu,
    jobdescription_en,
    jobtime_hu,
    jobtime_en,
    jobId,
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
      res.json({ message: "Job sikeresen frissítve" });
    }
  );
});

// Job törlése - DELETE
router.delete("/api/jobs/:id", (req, res) => {
  // Azonosító meghatározása
  const jobId = req.params.id;
  // Törlés az adatbázisból
  db.query(
    "DELETE FROM jobs WHERE id = ?",
    [jobId],
    // Hibakezelés
    (err, result) => {
      if (err) {
        console.error("Hiba a törlés során:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json({ message: "Job sikeresen törölve" });
    }
  );
});

module.exports = router;
