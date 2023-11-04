const express = require("express");
const router = express.Router();
const db = require("../../db");

// Adott ID-jű gép esetén az összes "Pending" státuszú rekord lekérdezése

router.get("/api/pendingBookingsMachine", (req, res) => {
  const { machine_id } = req.query;
  const sql =
    "SELECT * FROM bookings WHERE machine_id = ? AND status = 'Pending'";
  db.query(sql, [machine_id], (err, results) => {
    if (err) {
      console.error("Error fetching pending bookings:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
