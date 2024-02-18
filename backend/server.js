const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const path = require("path");
const scheduler = require("./routes/bookings/scheduler");
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  },
});
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: "http://localhost:8080", // így kap engedélyt middlewaren keresztül http requestek fogadásához
  })
);
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/thumbnails", express.static(path.join(__dirname, "/thumbnails")));
app.use("/bigimages", express.static(path.join(__dirname, "/bigimages")));
app.use("/pdfs", express.static(path.join(__dirname, "pdfs")));

// Scheduler elindítása
scheduler.scheduleBookingExpirationCheck();

/* Imports */
// Management imports
const paragraphsRoutes = require("./routes/paragraphs");
const galleryRoutes = require("./routes/gallery");
const filmsRoutes = require("./routes/films");
const machinesRoutes = require("./routes/machines");
const machinesGalleryRoutes = require("./routes/machinesGallery");
const jobsRoutes = require("./routes/jobs");
const adminsRoutes = require("./routes/admins");
// const aboutusRoutes = require("./routes/aboutus");

// Services imports
const authenticationRoutes = require("./routes/authentication");
const mailerRoutes = require("./routes/mailer");
// const statisticsRoutes = require("./routes/statistics");

/* Bookings imports */
const bookingsRoutes = require("./routes/bookings/bookings");
const pendingBookingsRoutes = require("./routes/bookings/pendingBookingsMachine");
const approvedBookingsRoutes = require("./routes/bookings/approvedBookingsMachine");
const paidBookingsRoutes = require("./routes/bookings/paidBookingsMachine");
const activeBookings = require("./routes/bookings/activeBookings");

/* Routes usage */
/* Management routes */
app.use(paragraphsRoutes);
app.use(galleryRoutes);
app.use(filmsRoutes);
app.use(machinesRoutes);
app.use(machinesGalleryRoutes);
app.use(jobsRoutes);
app.use(adminsRoutes);
// app.use(aboutusRoutes);

/* Services routes */
app.use(authenticationRoutes);
app.use(mailerRoutes);
// app.use(statisticsRoutes);

/* Bookings routes */
app.use(bookingsRoutes);
app.use(pendingBookingsRoutes);
app.use(approvedBookingsRoutes);
app.use(paidBookingsRoutes);
app.use(activeBookings);

// WebSocket setup
app.set("io", io);

// Start the server
server.listen(port, () => {
  console.log(`A szerver elindult a ${port} porton`);
});
