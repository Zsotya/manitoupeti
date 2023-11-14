const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");
const scheduler = require("./routes/bookings/scheduler");

// Scheduler elindítása
scheduler.scheduleBookingExpirationCheck();

// Middleware
app.use(
  cors({
    origin: "http://localhost:8080", // így kap engedélyt middlewaren keresztül http requestek fogadásához
  })
);
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Routes
const paragraphsRoutes = require("./routes/paragraphs");
const filmsRoutes = require("./routes/films");
const machinesRoutes = require("./routes/machines");
const jobsRoutes = require("./routes/jobs");
const adminsRoutes = require("./routes/admins");
const authenticationRoutes = require("./routes/authentication");
const mailerRoutes = require("./routes/mailer");

// Bookings imports
const bookingsRoutes = require("./routes/bookings/bookings");
const pendingBookingsRoutes = require("./routes/bookings/pendingBookingsMachine");
const approvedBookingsRoutes = require("./routes/bookings/approvedBookingsMachine");
const paidBookingsRoutes = require("./routes/bookings/paidBookingsMachine");

app.use(paragraphsRoutes);
app.use(filmsRoutes);
app.use(machinesRoutes);
app.use(jobsRoutes);
app.use(adminsRoutes);
app.use(authenticationRoutes);
app.use(mailerRoutes);

// Bookings routes
app.use(bookingsRoutes);
app.use(pendingBookingsRoutes);
app.use(approvedBookingsRoutes);
app.use(paidBookingsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
