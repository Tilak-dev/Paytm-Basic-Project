const express = require("express");
const mainRoute = require("./routes/index");

const PORT = 300;

const app = express();

//routes
app.use("api/vi", mainRoute);

app.listen(PORT, () => {
  console.log(`servee is running on port ${PORT}`);
});
