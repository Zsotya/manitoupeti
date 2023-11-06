const express = require("express");
const router = express.Router();
const db = require("../../db");

// GET REQUEST KEZELÉSE - Bookingok lekérdezése

router.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// Pending státuszú bookingok lekérdezése

router.get("/api/bookings/pending", (req, res) => {
  db.query("SELECT * FROM bookings WHERE status='Pending'", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// Approved státuszú bookingok lekérdezése

router.get("/api/bookings/approved", (req, res) => {
  db.query("SELECT * FROM bookings WHERE status='Approved'", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// Expired státuszú bookingok lekérdezése

router.get("/api/bookings/expired", (req, res) => {
  db.query("SELECT * FROM bookings WHERE status='Expired'", (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.json(results);
  });
});

// POST REQUEST KEZELÉSE - Új booking létrehozása

router.post("/api/bookings", (req, res) => {
  const {
    machine_id,
    first_name,
    last_name,
    email,
    phone_number,
    location,
    start_date,
    end_date,
    price,
  } = req.body;

  const sql =
    "INSERT INTO bookings (machine_id, first_name, last_name, email, phone_number, location, start_date, end_date, price) VALUES (?, ?, ?, ?, ?, ?, ? ,? ,?)";
  db.query(
    sql,
    [
      machine_id,
      first_name,
      last_name,
      email,
      phone_number,
      location,
      start_date,
      end_date,
      price,
    ],
    (err, results) => {
      if (err) {
        console.error("Error inserting booking:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }
      res.status(201).json({ message: "Booking added successfully" });
    }
  );
});

// Booking árának módosítása PATCH

router.patch("/api/bookings/price/:id", (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  const sql = "UPDATE bookings SET price = ? WHERE id = ?";
  db.query(sql, [price, id], (err, results) => {
    if (err) {
      console.error("Error updating the price:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.status(200).json({ message: "Price updated successfully" });
  });
});

// Státusz módosítása Approved-ra PATCH

router.patch("/api/bookings/approve/:id", (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE bookings SET status = 'Approved' WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error approving the booking:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.status(200).json({ message: "Booking approved successfully" });
  });
});

// Státusz módosítása Rejected-re, komment hozzáadása PATCH

router.patch("/api/bookings/reject/:id", (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;

  const sql =
    "UPDATE bookings SET status = 'Rejected', comment = ? WHERE id = ?";
  db.query(sql, [comment, id], (err, results) => {
    if (err) {
      console.error("Error rejecting the booking:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }
    res.status(200).json({ message: "Booking rejected successfully" });
  });
});

// Státusz módosítása Paid-re PATCH

router.patch("/api/bookings/markAsPaid/:id", (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE bookings SET status = 'Paid' WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Error marking the booking as Paid:", err);
      res.status(500).json({ error: "Database error" });
      return;
    }

    res.status(200).json({ message: "Booking marked as Paid successfully" });
  });
});

// Áthelyezés archive_bookings táblába, törlés bookings táblából POST

router.post("/api/bookings/archive/:id", (req, res) => {
  const { id } = req.params;

  const archiveQuery = `
      INSERT INTO archive_bookings (booking_id, machine_id, first_name, last_name, email, phone_number, location, start_date, end_date, status, price, created_at, comment)
      SELECT id, machine_id, first_name, last_name, email, phone_number, location, start_date, end_date, status, price, created_at, comment
      FROM bookings
      WHERE id = ?;
  `;

  const deleteQuery = `
      DELETE FROM bookings
      WHERE id = ?;
  `;

  db.query(archiveQuery, [id], (err, results) => {
    if (err) {
      console.error("Error archiving the booking:", err);
      res.status(500).json({ error: "Database error" });
    } else {
      db.query(deleteQuery, [id], (err, results) => {
        if (err) {
          console.error("Error deleting the booking:", err);
          res.status(500).json({ error: "Database error" });
        } else {
          res.json({
            message: "Booking archived and deleted from bookings successfully",
          });
        }
      });
    }
  });
});

module.exports = router;
