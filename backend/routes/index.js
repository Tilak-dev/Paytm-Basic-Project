const express = require("express"); //import
const userRoute = require("./user");
const accountRoute = require("./account");

const router = express.Router(); //router

router.use("/user", userRoute);
router.use("/account", accountRoute);
//export router
module.exports = router;
