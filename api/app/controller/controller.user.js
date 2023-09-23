const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/model.user");

exports.index = async (req, res) => {
  res.json("Hello, world!");
};

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    // Check if the user is already registered
    const userExists = await User.findOne({ email });
    if (userExists) {
      res.status(400).json({
        status: 400,
        message: "Email already registered",
      });
      return;
    }
    console.log("hello");
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "host",
    });
    await newUser.save();
    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      data: err.message,
    });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({
      status: "error",
      message: "Email or Password are required",
    });

  try {
    const user = await User.findOne({ email });

    if (!user)
      return res.status(400).json({
        status: "error",
        data: "User does not exist",
      });

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      res.status(400).json({
        status: "error",
        message: "Invalid Password",
      });
      return;
    }

    const payload = {
      sub: user._id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
    };

    const access_token = await generateAccessToken(payload);
    const refresh_token = await generateRefreshToken(payload);
    user.password = undefined;

    req.user = user;

    res.status(200).cookie("token", access_token).json({
      status: "success",
      data: {
        user,
        access_token,
        refresh_token,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("token").json({ message: "User logged out" });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: "Error in logging out",
    });
  }
};

exports.profile = async (req, res) => {
  try {
    const { _id, name, email, role, password } = await User.findById(
      req.params.id
    );
    res.json({ _id, name, email, role, password });
  } catch (err) {
    res.status(404).json({
      status: "error",
      data: err.message,
    });
  }
};

exports.update = async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await User.findOne({ email });
    user.name = name;
    user.email = email;
    console.log(user);

    user.save();

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

function generateAccessToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20m" },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}

// To generate tokens secret
// require("crypto").randomBytes(64).toString("hex")

function generateRefreshToken(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "20d" },
      (err, token) => {
        if (err) return reject(err);
        resolve(token);
      }
    );
  });
}
