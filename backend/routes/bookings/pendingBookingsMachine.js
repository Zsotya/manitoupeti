const express = require("express");
const router = express.Router();
const db = require("../../db");

// Adott ID-jű gép esetén az összes "Pending" státuszú rekord lekérdezése - GET

router.get("/api/pendingBookingsMachine", (req, res) => {
  const { machine_id } = req.query;
  const sql =
    "SELECT * FROM bookings WHERE machine_id = ? AND status = 'Pending'";
  db.query(sql, [machine_id], (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés közben (Pending):", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
