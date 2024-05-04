const express = require("express");
const { Account } = require("../db");
const authMiddleware = require("../middleware");
const mongoose = require("mongoose");

const router = express.Router();

router.post("/tranfer", authMiddleware, async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  //fetching the account with in yransactionStart and commit
  const accoumt = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!accoumt || accoumt.balance < accoumt) {
    await session.abortTransaction();
    return res.status(500).json({
      msg: "insufficient balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }.session(session));

  if (!toAccount) {
    await session.abortTransaction();
    return res.status(500).json({
      msg: "invalid account details",
    });
  }

  //perform the transactions
  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  //conmmit transactions to done
  await session.commitTransaction();
  res.status(200).json({
    msg: "tranfer successfully",
  });
});

router.get("balance", authMiddleware, async (req, res) => {
  const account = await Account.findOne({
    userId: req.body,
  });
  if (!account) {
    return res.status(403).json({
      msg: "error in balance",
    });
  }
  res.status(200).json({
    balance: account.balance,
  });
});

module.exports = router;
