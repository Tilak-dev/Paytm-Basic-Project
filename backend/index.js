const express = require("express");
const signin = require("./routes/signin");
const signup = require("./routes/signup");
const PORT = 300;

const app = express();

//routes
app.use("/api/v1", signin);
app.use("/api/v1", signup);

app.listen(PORT, () => {
  console.log(`servee is running on port ${PORT}`);
});
