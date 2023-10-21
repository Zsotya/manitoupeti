const express = require("express");
const router = express.Router();
const db = require("../../db");

// Adott ID-jű gép esetén az összes "Accepted" státuszú rekord lekérdezése

router.get("/api/acceptedBookings", (req, res) => {
  const { machine_id } = req.query;
  const sql =
    "SELECT * FROM bookings WHERE machine_id = ? AND status = 'Accepted'";
  db.query(sql, [machine_id], (err, results) => {
    if (err) {
      console.error("Error fetching accepted bookings:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
