const mongoose = require("mongoose");

const Connect = async (req, res) => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database Connected");
  } catch (error) {
    return error.message;
  }
};

module.exports = Connect;
