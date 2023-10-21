const express = require("express");
const router = express.Router();
const db = require("../../db");

// Adott ID-jű gép esetén az összes "Paid" státuszú rekord lekérdezése

router.get("/api/paidBookings", (req, res) => {
  const { machine_id } = req.query;
  const sql = "SELECT * FROM bookings WHERE machine_id = ? AND status = 'Paid'";
  db.query(sql, [machine_id], (err, results) => {
    if (err) {
      console.error("Error fetching paid bookings:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
