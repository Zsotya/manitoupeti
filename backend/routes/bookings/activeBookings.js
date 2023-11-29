const express = require("express");
const router = express.Router();
const db = require("../../db");

// Adott státuszú foglalások darabszámának meghatározása - GET
router.get("/api/bookingCountsAllMachines", (req, res) => {
  // Lekérdezés
  const countsSql = `
    SELECT
      (SELECT COUNT(*) FROM bookings WHERE status = 'Pending') as pending,
      (SELECT COUNT(*) FROM bookings WHERE status = 'Approved') as approved,
      (SELECT COUNT(*) FROM bookings WHERE status = 'Expired') as expired
  `;
  db.query(
    countsSql,
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba a lekérdezés közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // Eredmények feldolgozása, válasz küldése a kliensnek
      const counts = {
        pending: results[0].pending,
        approved: results[0].approved,
        expired: results[0].expired,
      };

      res.json(counts);
    }
  );
});

// Aktív "Paid" státuszú bookingok lekérdezése - GET

router.get("/api/bookings/activePaid", (req, res) => {
  // Lekérdezés
  const paidBookingsSql = `
  SELECT
    bookings.id,
    bookings.machine_id,
    bookings.first_name,
    bookings.last_name,
    bookings.location,
    bookings.start_date,
    bookings.end_date,
    machines.machine_name
  FROM bookings
  JOIN machines ON bookings.machine_id = machines.id
  WHERE bookings.status = 'Paid';
`;
  db.query(
    paidBookingsSql,
    // Hibakezelés
    (err, results) => {
      if (err) {
        console.error("Hiba a lekérdezés közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      res.json(results);
    }
  );
});

module.exports = router;
