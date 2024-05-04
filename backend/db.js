const mongoose = require("mongoose");
//url handy
const url =
  "mongodb+srv://tilak001:tilak001@cluster0.1dhtbga.mongodb.net/paytmApp";

mongoose.connect(url);
const userTable = mongoose.Schema({
  //after finishing this i will add more functionality
  userName: {
    typeof: String,
    required: true,
  },
  firstName: {
    typeof: String,
    required: true,
  },
  lastName: {
    typeof: String,
    required: true,
  },
  password: {
    typeof: String,
    required: true,
  },
});

//accout data reference
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",//reference
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const User = mongoose.model("User", userTable);
const Account = mongoose.model("Account",accountSchema)

module.exports = {
  User,
  Account,
};
