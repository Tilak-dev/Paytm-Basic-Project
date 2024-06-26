const mongoose = require("mongoose");
//url handy
const url =
  "mongodb+srv://tilak001:tilak001@cluster0.1dhtbga.mongodb.net/paytmApp";

mongoose.connect(url);
const userTable = mongoose.Schema({
  //after finishing this i will add more functionality
  userName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//accout data reference
const accountSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", //reference
    // required: true,
  },
  balance: {
    type: Number,
    // required: true,
  },
});

const User = mongoose.model("User", userTable);
const Account = mongoose.model("Account", accountSchema);

module.exports = {
  User,
  Account,
};
