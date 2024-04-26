const express = require("express"); //import
const userRoute = require("./user");

const router = express.Router(); //router

router.use("/user", userRoute);
//export router
module.exports = router;
