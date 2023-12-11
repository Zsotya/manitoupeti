const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../db");

const crypto = require("crypto");
// 32 byte-os random kulcs generálása
const secretKey = crypto.randomBytes(32).toString("hex");
// console.log(secretKey);

// Bejelentkezési kísérlet
router.post("/api/authentication", (req, res) => {
  console.log("Bejelentkezési kísérletet hajtottak végre");
  const { username, password } = req.body;
  // Lekérdezés
  connection.query(
    "SELECT * FROM admin_users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        // Hibakezelés
        console.error("Hiba az adatbázis lekérdezés közben:", err);
        res.status(500).json({ error: "Adatbázis hiba" });
        return;
      }
      // Nincs a felhasználónévvel admin rekord az adatbázisban
      if (results.length === 0) {
        // console.log("Nincs ilyen admin username");
        res.json({ authenticated: false });
      }
      // Van felhasználónévvel rekord
      else {
        const user = results[0];
        // Jelszó összehasonlítás
        bcrypt.compare(
          password,
          user.password,
          (compareError, passwordMatch) => {
            // Hibás jelszó létező felhasználónévhez
            if (compareError || !passwordMatch) {
              // console.log("Van admin username, de nem jó a jelszó");
              res.json({ authenticated: false });
            }
            // Helyes jelszó létező felhasználónévhez
            else {
              // console.log("Username,jelszó megfelelő. Belépés biztosítva");
              const token = jwt.sign({ userId: user.id }, secretKey, {
                expiresIn: "1h",
              });
              // authenticated, is_main_admin kulcs és token visszaküldés
              res.json({
                authenticated: true,
                token,
                is_main_admin: user.is_main_admin,
              });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
