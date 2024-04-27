const express = require("express");
const cors = require("cors");
const mainRoute = require("./routes/index");
const PORT = 300;

const app = express();
//middleware
app.use(express.json());
app.use(cors());

// all routes routes
app.use("api/vi", mainRoute);

app.listen(PORT, () => {
  console.log(`servee is running on port ${PORT}`);
});
