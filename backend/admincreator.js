const readline = require("readline");
const bcrypt = require("bcrypt");
const mysql = require("mysql2/promise");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function createAdmin() {
  const username = await getUserInput("Új felhasználónév: ");
  const password = await getUserInput("Új jelszó: ");
  const fullName = await getUserInput("Teljes név: ");

  const saltRounds = 13;
  bcrypt.hash(password, saltRounds, async (err, hashedPassword) => {
    if (err) {
      console.error(err);
      return;
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "manitoupetidb",
    });

    const sql =
      "INSERT INTO admin_users (username, password, full_name) VALUES (?, ?, ?)";
    const values = [username, hashedPassword, fullName];

    try {
      await connection.execute(sql, values);
      console.log("Admin felhasználó sikeresen létrehozva");
    } catch (error) {
      console.error("Hiba az admin felhasználó létrehozásakor:", error);
    } finally {
      connection.end();
    }
  });
}

function getUserInput(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

createAdmin().then(() => {
  rl.close();
});
