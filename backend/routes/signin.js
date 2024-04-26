const express = require("express"); //import

const router = express.Router(); //router

// //handle requests using router
router.get("/signin", (res, req, next) => {
  res.statusCode(200).json({
    msg: "signin",
  });
});

//export router
module.exports = router;
