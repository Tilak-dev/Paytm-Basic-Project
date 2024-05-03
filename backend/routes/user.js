const express = require("express"); //import
const zod = require("zod");
const { User } = require("../db");
const router = express.Router(); //router
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authHeader } = require("../middleware");

const updateSchema = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.get("/search", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });
  res.status(200).json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

router.put("/profile", authHeader, async (req, res) => {
  const { success } = updateSchema.safeParse(req.body);
  if (!success) {
    return res.status(403).json({
      msg: "Error in input/updating",
    });
  }
  await User.updateOne(req.body, {
    id: req.userId,
  });
  res.status(200).json({
    msg: "updated successfully",
  });
});
//signup
const signupSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

router.post("/signup", async (res, req) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.statusCode(200).json({
      msg: "Email Already Exists / Incorrect input",
    });
  }
  const user = User.findOne({
    username: body.username,
  });
  if (user._id) {
    return res.statusCode(200).json({
      msg: "Email Already Exists / Incorrect input",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET
  );
});
//signin
const signinSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
});
router.post("/signin", async (res, req) => {
  const body = req.body;
  const { success } = signinSchema.safeParse(req.body);
  if (!success) {
    return res.statusCode(200).json({
      msg: "Email Already Exists / Incorrect input",
    });
  }
  const user = User.findOne({
    username: req.body.username,
    password: req.body.password,
  });
  if (!user) {
    return res.statusCode(200).json({
      msg: "Error / Incorrect input",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET
  );

  res.status(200).json({
    token: token,
  });
});

//export router
module.exports = router;
