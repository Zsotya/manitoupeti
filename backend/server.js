const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const path = require("path");

app.use(
  cors({
    origin: "http://localhost:8080", // így kap engedélyt middlewaren keresztül http requestek fogadásához
  })
);

app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend/public")));

const paragraphsRoutes = require("./routes/paragraphs");
const jobsRoutes = require("./routes/jobs");
const filmsRoutes = require("./routes/films");
const authenticationRoutes = require("./routes/authentication");

app.use(paragraphsRoutes);
app.use(jobsRoutes);
app.use(filmsRoutes);
app.use(authenticationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
