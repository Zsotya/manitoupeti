const db = require("../../db");
const cron = require("node-cron");

function scheduleBookingExpirationCheck() {
  // Éjfélre időzítés
  cron.schedule("0 0 * * *", async () => {
    try {
      // 3 nappal ezelőtti nap kiszámítása
      const threeDaysAgo = new Date();
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

      // Approved státuszú bookingok listázása és Expired státuszra állítása, ha 3 napnál régebbi
      const query = `
          UPDATE bookings
          SET status = 'Expired'
          WHERE status = 'Approved' AND updated_at < ?;
        `;

      const [results] = await db.execute(query, [threeDaysAgo]);
      console.log(`Updated ${results.affectedRows} bookings to 'Expired'.`);
    } catch (error) {
      console.error("Error updating bookings:", error);
    }
  });
}

module.exports = { scheduleBookingExpirationCheck };
