const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const connection = require("../db");

const secretKey = "szupertitkoskulcs";

router.post("/api/authentication", (req, res) => {
  console.log("Authentication route accessed.");
  const { username, password } = req.body;

  connection.query(
    "SELECT * FROM admin_users WHERE username = ?",
    [username],
    (err, results) => {
      if (err) {
        console.error("Error querying the database:", err);
        res.status(500).json({ error: "Database error" });
        return;
      }

      if (results.length === 0) {
        console.log("Nincs ilyen admin username");
        res.json({ authenticated: false });
      } else {
        const user = results[0];
        bcrypt.compare(
          password,
          user.password,
          (compareError, passwordMatch) => {
            if (compareError || !passwordMatch) {
              console.log("Van admin username, de nem jó a jelszó");
              res.json({ authenticated: false });
            } else {
              console.log("Username,jelszó megfelelő. Belépés biztosítva");
              const token = jwt.sign({ userId: user.id }, secretKey, {
                expiresIn: "1h",
              });
              res.json({ authenticated: true, token });
            }
          }
        );
      }
    }
  );
});

module.exports = router;
