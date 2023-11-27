const express = require("express");
const router = express.Router();
const db = require("../../db");

// Adott ID-jű gép esetén az összes "Paid" státuszú rekord lekérdezése - GET

router.get("/api/paidBookingsMachine", (req, res) => {
  const { machine_id } = req.query;
  const sql = "SELECT * FROM bookings WHERE machine_id = ? AND status = 'Paid'";
  db.query(sql, [machine_id], (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés közben (Paid):", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
