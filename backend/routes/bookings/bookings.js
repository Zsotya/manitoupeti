const express = require("express");
const router = express.Router();
const db = require("../../db");

/* REQUESTEK KEZELÉSE */

// Összes booking lekérdezése - GET
router.get("/api/bookings", (req, res) => {
  db.query("SELECT * FROM bookings", (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

// Pending státuszú bookingok lekérdezése - GET

router.get("/api/bookings/pending", (req, res) => {
  db.query("SELECT * FROM bookings WHERE status='Pending'", (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

// Approved státuszú bookingok lekérdezése - GET

router.get("/api/bookings/approved", (req, res) => {
  db.query("SELECT * FROM bookings WHERE status='Approved'", (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

// Expired státuszú bookingok lekérdezése - GET

router.get("/api/bookings/expired", (req, res) => {
  db.query("SELECT * FROM bookings WHERE status='Expired'", (err, results) => {
    if (err) {
      console.error("Hiba a lekérdezés közben::", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.json(results);
  });
});

// Új booking létrehozása - POST

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
        console.error("Hiba az adatbázisba beszúrás közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // Kliensek értesítése a változásról
      const io = req.app.get("io");
      io.emit("bookingsUpdated");
      res.status(201).json({ message: "Booking sikeresen létrehozva" });
    }
  );
});

// Booking árának módosítása - PATCH

router.patch("/api/bookings/price/:id", (req, res) => {
  const { id } = req.params;
  const { price } = req.body;

  const sql = "UPDATE bookings SET price = ? WHERE id = ?";
  db.query(sql, [price, id], (err, results) => {
    if (err) {
      console.error("Hiba az ár módosításakor:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    res.status(200).json({ message: "Ár sikeresen módosítva" });
  });
});

// Státusz módosítása Approved-ra - PATCH

router.patch("/api/bookings/approve/:id", (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE bookings SET status = 'Approved' WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Hiba a booking elfogadása közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    // Kliensek értesítése a változásról
    const io = req.app.get("io");
    io.emit("bookingsUpdated");
    res.status(200).json({ message: "Booking sikeresen elfogadva" });
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
      console.error("Hiba a booking elutasítása közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    // Kliensek értesítése a változásról
    const io = req.app.get("io");
    io.emit("bookingsUpdated");
    res.status(200).json({ message: "Booking sikeresen elutasítva" });
  });
});

// Státusz módosítása Paid-re PATCH

router.patch("/api/bookings/markAsPaid/:id", (req, res) => {
  const { id } = req.params;

  const sql = "UPDATE bookings SET status = 'Paid' WHERE id = ?";
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error("Hiba a státusz módosítása közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }
    // Kliensek értesítése a változásról
    const io = req.app.get("io");
    io.emit("bookingsUpdated");
    res
      .status(200)
      .json({ message: "Booking sikeresen Paid státuszúnak lett jelölve" });
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
      console.error("Hiba archiválás közben:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
    } else {
      db.query(deleteQuery, [id], (err, results) => {
        if (err) {
          console.error("Hiba a booking törlése közben:", err);
          res.status(500).json({ error: "Adatbázis hiba" });
        } else {
          res.json({
            message: "Booking sikeresen archiválva és törölve",
          });
        }
      });
    }
  });
});

module.exports = router;
