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
      console.error("Hiba a lekérdezés közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

// Havi foglalások darabszámának lekérdezése minden hónapra
router.get("/api/statistics/monthly-bookings", (req, res) => {
  const query = `
    SELECT
      YEAR(created_at) AS booking_year,
      MONTH(created_at) AS booking_month,
      COUNT(*) AS monthly_bookings
    FROM
      (
        SELECT created_at FROM bookings
        UNION ALL
        SELECT created_at FROM archive_bookings
      ) AS all_bookings
    GROUP BY booking_year, booking_month;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

// Adott gépek foglalásainak darabszáma
router.get("/api/statistics/machine-bookings", (req, res) => {
  const query = `
    SELECT machines.id AS machine_id, machines.machine_name, SUM(total_count) AS booking_count
    FROM machines
    LEFT JOIN (
      SELECT machine_id, COUNT(*) AS total_count
      FROM (
        SELECT machine_id FROM bookings
        UNION ALL
        SELECT machine_id FROM archive_bookings
      ) AS combined_bookings
      GROUP BY machine_id
    ) AS counts ON machines.id = counts.machine_id
    GROUP BY machines.id, machines.machine_name
    HAVING booking_count IS NOT NULL AND booking_count > 0;`;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Hiba a lekérdezés közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(result);
  });
});

module.exports = router;
