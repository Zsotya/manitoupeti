const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:8080", // így kap engedélyt middlewaren keresztül http requestek fogadásához
  })
);

app.use(express.json());
const paragraphsRoutes = require("./routes/paragraphs");
const jobsRoutes = require("./routes/jobs");
const authenticationRoutes = require("./routes/authentication");

app.use(paragraphsRoutes);
app.use(jobsRoutes);
app.use(authenticationRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
