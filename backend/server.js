const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const paragraphsRoutes = require("./routes/paragraphs");

app.use(paragraphsRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
