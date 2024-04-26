const express = require("express"); //import

const router = express.Router(); //router

// //handle requests using router
router.get("/signup", (res, req, next) => {
  res.statusCode(200).json({
    msg: "signup",
  });
});

//export router
module.exports = router;
