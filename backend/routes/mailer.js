const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
const multer = require("multer");

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
  // Adatok inicializálása, előkészítése
  const { lastName, firstName, email, subject, message } = req.body;
  const fullName = `${lastName} ${firstName}`;

  // Üzenet konfigurálása
  const mailOptions = {
    from: "manitoupetinoreply@gmail.com",
    to: "manitoupetinoreply@gmail.com",
    subject: `Új üzenet a Kapcsolat oldalról - ${subject}`,
    text: `Név: ${fullName}\nEmail: ${email}\n\nÜzenet:\n${message}`,
  };

  // Email elküldése
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

// Állásra jelentkező emailek kezelése
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/api/job-application",
  upload.single("resume"),
  async (req, res) => {
    try {
      // Adatok inicializálása
      const {
        lastName,
        firstName,
        birthDate,
        birthLocation,
        email,
        phoneNumber,
        zipCode,
        settlement,
        district,
        publicAreaName,
        publicAreaType,
        houseNumber,
        building,
        stairway,
        floor,
        door,
        jobName,
      } = req.body;
      const resume = req.file.buffer;

      // Form adatok előkészítése
      const fullName = `${lastName} ${firstName}`;
      const districtFormat = district ? `${district} kerület` : "";
      const buildingFormat = building ? `${building} épület` : "";
      const stairwayFormat = stairway ? `${stairway} lépcsőház` : "";
      const floorFormat = floor ? `${floor} emelet` : "";
      const doorFormat = door ? `${door} ajtó` : "";
      const address = `${zipCode} ${settlement} ${districtFormat} ${publicAreaName} ${publicAreaType} ${houseNumber} ${buildingFormat} ${stairwayFormat} ${floorFormat} ${doorFormat}`;

      // Fájlnév sztring
      const currentDate = new Date()
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "");
      const fileName = `${fullName} ${currentDate}.pdf`;

      // Email beállítása
      const mailOptions = {
        from: "manitoupetinoreply@gmail.com",
        to: "manitoupetinoreply@gmail.com",
        subject: `Új állásjelentkezés - ${jobName}`,
        text: `A ManitouPeti weboldalon Önnek új állásjelentkezése érkezett a ${jobName} állásra. Az ehhez tartozó adatok a következők:\n\nNév: ${fullName}\nSzületési idő: ${birthDate}\nSzületési hely: ${birthLocation}\nEmail: ${email}\nTelefonszám: ${phoneNumber}\nLakhely: ${address}\nMegpályázott munkakör: ${jobName}\n\nA jelentkezéshez csatolt önéletrajzot az email csatolmányai között tekintheti meg.\n\nManitouPeti`,
        attachments: [
          {
            filename: fileName,
            content: resume,
            encoding: "base64",
          },
        ],
      };

      // Email küldése
      const info = await transporter.sendMail(mailOptions);
      // Sikeres elküldés esetén üzenet kiírása, válasz a kliensnek
      console.log("Email elküldve:", info.response);
      res.json({ success: "Jelentkezési email sikeresen elküldve!" });
    } catch (error) {
      console.error("Hiba a jelentkezési email elküldésekor:", error);
      res
        .status(500)
        .json({ error: "Hiba a jelentkezési email elküldésekor!" });
    }
  }
);

// Elfogadás esetén email küldése a megadott email címre
router.post("/api/approvalMail", async (req, res) => {
  try {
    // Adatok inicializálása, előkészítés az emailhez
    const {
      bookingId,
      first_name,
      last_name,
      email,
      start_date,
      end_date,
      price,
    } = req.body;
    const fullName = `${last_name} ${first_name}`;
    const formattedStartDate = new Date(start_date).toLocaleDateString("hu-HU");
    const formattedEndDate = new Date(end_date).toLocaleDateString("hu-HU");
    const accountNumber = "11112222-33334444-55556666";

    // Üzenet konfigurálása
    const mailOptions = {
      from: "manitoupetinoreply@gmail.com",
      to: email,
      subject: `ManitouPeti - ${bookingId}ID-jű megrendelés elfogadásra került`,
      text: `Tisztelt ${fullName},\n\nAz Ön ${bookingId}ID-vel rendelkező ${formattedStartDate} - ${formattedEndDate} időintervallumra vonatkozó foglalását feldolgoztuk és elfogadtuk.\nA megrendelés véglegesítéséhez a következő számlaszámra kell elküldenie a meghatározott összeget:\n\nSzámlaszám: ${accountNumber}\nFizetendő összeg: ${price}Ft\n\nA fizetési határidő a jelenlegi e-mail kiküldését követő 3 nap. Kérjük, időben fizesse ki a megrendelést, ellenkező esetben a megrendelése elutasításra kerül.\n\nÜdvözlettel,\nManitouPeti csapata`,
    };

    // Email elküldése
    const info = await transporter.sendMail(mailOptions);
    // Sikeres elküldés esetén üzenet kiírása, válasz a kliensnek
    console.log("Email elküldve:", info.response);
    res.json({ success: "Email sikeresen elküldve!" });
  } catch (error) {
    // Hibakezelés
    console.error("Hiba az email elküldésekor:", error);
    res.status(500).json({ error: "Hiba az email elküldésekor!" });
  }
});

module.exports = router;
