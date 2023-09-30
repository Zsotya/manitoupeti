const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:8080", // így kap engedélyt middlewaren keresztül http requestek fogadásához
  })
);

const paragraphsRoutes = require("./routes/paragraphs");
app.use(paragraphsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
