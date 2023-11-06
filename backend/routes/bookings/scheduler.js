const db = require("../../db");
const cron = require("node-cron");

function scheduleBookingExpirationCheck() {
  // Éjfélre időzítés
  cron.schedule("00 00 * * *", async () => {
    try {
      // 3 nappal ezelőtti nap kiszámítása
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      // Irreleváns (end_date régebbi a mai napnál) bookingok másolása az archive_bookings táblába
      const archiveQuery = `
        INSERT INTO archive_bookings (booking_id, machine_id, first_name, last_name, email, phone_number, location, start_date, end_date, status, price, created_at, comment)
        SELECT id, machine_id, first_name, last_name, email, phone_number, location, start_date, end_date, status, price, created_at, comment
        FROM bookings
        WHERE end_date < NOW();
      `;

      // A másolt booking törlése a bookings táblából
      const deleteQuery = `
        DELETE FROM bookings
        WHERE end_date < NOW();
      `;

      // Approved státuszú bookingok listázása és Expired státuszra állítása, ha x napnál régebbi
      const updateQuery = `
          UPDATE bookings
          SET status = 'Expired'
          WHERE status = 'Approved' AND updated_at < ?;
        `;

      // Queryk lefuttatása
      // archiveQuery
      db.query(archiveQuery, (archiveError, archiveResults) => {
        if (archiveError) {
          console.error("Hiba archiválás közben:", archiveError);
        } else {
          console.log(
            `Másolás sikeres. Másolt sorok száma: ${archiveResults.affectedRows}`
          );
          // deleteQuery
          db.query(deleteQuery, (deleteError, deleteResults) => {
            if (deleteError) {
              console.error("Hiba törlés közben:", deleteError);
            } else {
              console.log(
                `Törlés sikeres. Törölt sorok száma: ${deleteResults.affectedRows}`
              );
              console.log("Sikeres archiválás!");
            }
          });
        }
      });
      // updateQuery
      db.query(updateQuery, [threeDaysAgo], (updateError, updateResults) => {
        if (updateError) {
          console.error("Hiba a státusz módosításakor:", updateError);
        } else {
          console.log(
            `Lejárt foglalások státusza sikeresen módosítva "Rejected" státuszra. Módosított sorok száma: ${updateResults.affectedRows}`
          );
        }
      });
    } catch (error) {
      console.error("Hiba:", error);
    }
  });
}

module.exports = { scheduleBookingExpirationCheck };
