const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please enter all Fields",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const userData = { name: user.name, email: user.email };

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      userData,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Password not match",
        success: false,
      });
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
      },
      process.env.SECRET_KEY,
      { expiresIn: "30d" },
    );

    return res.status(200).json({
      message: "Login successfully",
      success: true,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = { userSignup, userLogin };
