const express = require("express"); //import

const router = express.Router(); //router

// //handle requests using router
router.get("/signin", (res, req, next) => {
  res.statusCode(200).json({
    msg: "signin",
  });
});
router.get("/signup", (res, req, next) => {
  res.statusCode(200).json({
    msg: "signup",
  });
});
router.get("/home", (res, req, next) => {
  res.statusCode(200).json({
    msg: "home",
  });
});

//export router
module.exports = router;
