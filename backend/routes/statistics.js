const express = require("express");
const router = express.Router();
const db = require("../db");

// Havi bevétel lekérdezése minden hónapra
router.get("/api/statistics/monthly-revenue", (req, res) => {
  const query = `
    SELECT
      YEAR(updated_at) AS payment_year,
      MONTH(updated_at) AS payment_month,
      SUM(price) AS monthly_revenue
    FROM
      (
        SELECT updated_at, price FROM bookings WHERE status = 'Paid'
        UNION ALL
        SELECT updated_at, price FROM archive_bookings WHERE status = 'Paid'
      ) AS paid_bookings
    GROUP BY payment_year, payment_month;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

module.exports = router;
