const express = require("express");
const router = express.Router();
const db = require("../db"); // Adatbázis modul importálása

// GET REQUEST KEZELÉSE - Jobok listázása

router.get("/api/jobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// POST REQUEST KEZELÉSE - Új job létrehozása

router.post("/api/jobs", (req, res) => {
  const {
    jobname_hu,
    jobname_en,
    jobdescription_hu,
    jobdescription_en,
    jobtime_hu,
    jobtime_en,
  } = req.body;

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
    (err, result) => {
      if (err) {
        console.error("Error adding job to the database:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      res.status(201).json({ message: "Job added successfully" });
    }
  );
});

module.exports = router;
