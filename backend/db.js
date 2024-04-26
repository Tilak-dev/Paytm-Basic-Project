const mongoose = require("mongoose");
//url handy
const url = "mongodb+srv://tilak001:tilak001@cluster0.1dhtbga.mongodb.net/paytmApp";

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

const userModel = mongoose.model("User", userTable);

module.exports = {
  userModel,
};
