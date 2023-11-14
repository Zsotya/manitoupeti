const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

// Feladó adatok meghatározása
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "manitoupetinoreply@gmail.com",
    pass: "wjyi qunu cgbf qgkv",
  },
});

// Kapcsolat oldalról érkező emailek kezelése
router.post("/api/contactus", (req, res) => {
  const { lastName, firstName, email, subject, message } = req.body;

  const fullName = `${lastName} ${firstName}`;

  const mailOptions = {
    from: "manitoupetinoreply@gmail.com",
    to: "manitoupetinoreply@gmail.com",
    subject: `Új üzenet a Kapcsolat oldalról - ${subject}`,
    text: `Név: ${fullName}\nEmail: ${email}\n\nÜzenet:\n${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Hiba az email elküldésekor:", error);
      res.status(500).json({ error: "Hiba az email elküldésekor!" });
    } else {
      console.log("Email elküldve:", info.response);
      res.json({ success: "Email sikeresen elküldve!" });
    }
  });
});

module.exports = router;
