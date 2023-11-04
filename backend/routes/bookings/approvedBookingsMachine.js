const express = require("express");
const router = express.Router();
const db = require("../../db");

// Adott ID-jű gép esetén az összes "Approved" státuszú rekord lekérdezése

router.get("/api/approvedBookingsMachine", (req, res) => {
  const { machine_id } = req.query;
  const sql =
    "SELECT * FROM bookings WHERE machine_id = ? AND status = 'Approved'";
  db.query(sql, [machine_id], (err, results) => {
    if (err) {
      console.error("Error fetching approved bookings:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
