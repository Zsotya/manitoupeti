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

module.exports = router;
