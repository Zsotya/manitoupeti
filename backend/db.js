const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();
const connection = createConnection();

// Kapcsolat létrehozása funkció
function createConnection() {
  return mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
  });
}

// Kapcsolódás kezelése, újrapróbálkozási logika
function handleConnection() {
  // Kapcsolódási kísérlet
  connection.getConnection((err, conn) => {
    if (err) {
      console.error("Hiba az adatbázishoz kapcsolódáskor:", err);
      // Kapcsolódás újrapróbálása időzítés
      console.log("Újrapróbálkozás 5 másodpercen belül...");
      setTimeout(handleConnection, 5000);
    } else {
      console.log("Sikeres kapcsolódás az adatbázishoz");
      conn.release();
    }
  });
}

// Kezdeti csatlakozás
handleConnection();

// Könnyed bezárás azonnal shut helyett
process.on("SIGINT", () => {
  connection.end((err) => {
    if (err) {
      console.error("Hiba az adatbázis csatlakozás bezárása közben:", err);
    } else {
      console.log("Adatbázis csatlakozás bezárva.");
      process.exit();
    }
  });
});

// Exportálás
module.exports = connection;
