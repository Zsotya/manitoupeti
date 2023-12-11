const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");

// Adminok listázása (jelszó nélkül, főadminok kivételével) - GET
router.get("/api/admins", (req, res) => {
  // Lekérdezés
  db.query(
    "SELECT id, username, full_name FROM admin_users WHERE is_main_admin = 0",
    (err, results) => {
      // Hibakezelés
      if (err) {
        console.error("Hiba az adatbázis lekérdezése közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // Sikeres lekérdezés esetén az eredmény visszaküldése
      res.json(results);
    }
  );
});

// Új admin létrehozása - POST
router.post("/api/admins", async (req, res) => {
  const { username, password, full_name } = req.body;
  // Jelszó hashelés
  const saltRounds = 13;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const result = await db.execute(
      "INSERT INTO admin_users (username, password, full_name) VALUES (?, ?, ?)",
      [username, hashedPassword, full_name]
    );
    // Sikeres létrehozás
    res.status(201).json({ message: "Admin felhasználó sikeresen létrehozva" });
  } catch (error) {
    // Hibakezelés
    console.error("Hiba az admin felhasználó létrehozása közben:", error);
    res.status(500).json({ error: "Hiba az admin létrehozásakor" });
  }
});

// Admin eltávolítása - DELETE

router.delete("/api/admins/:id", async (req, res) => {
  // Azonosító meghatározása
  const adminId = req.params.id;
  // Törlés az adatbázisból
  db.query("DELETE FROM admin_users WHERE id = ?", [adminId], (err, result) => {
    // Hibakezelés
    if (err) {
      console.error("Hiba az admin felhasználó törlésekor:", err);
      res.status(500).json({ error: "Adatbázis hiba" });
      return;
    }

    // Vizsgálat, hogy ténylegesen töröltünk-e elemet
    if (result.affectedRows === 0) {
      res.status(404).json({ error: "Nincs ilyen admin felhasználó" });
    }
    // Sikeres eltávolítás
    else {
      res.json({ message: "Admin felhasználó sikeresen eltávolítva" });
    }
  });
});

module.exports = router;
