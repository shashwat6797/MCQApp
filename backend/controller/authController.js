const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cookieparser = require("cookie-parser");

const generateAccessToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ email: user.email }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    user = new User({ username, email, password: hashedPassword });

    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Find the user
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  // Generate tokens
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  // Set the refresh token in an HTTP-only cookie
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true, // Prevent client-side access
    secure: true, // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 2 * 24 * 60 * 60 * 1000, // 2 days expiration
  });

  const username = user.username;
  const useremail = user.email;

  res.json({
    accessToken,
    username,
    useremail,
    message: "Login successful",
  });
};

const profile = async (req, res) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log({ decoded });
    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const username = user.username;
    const useremail = user.email;
    res.json({ useremail, username });
  } catch (error) {
    console.log("Error while fetching user info : ", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

const refreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = generateAccessToken({ email: decoded.email });
    const user = await User.findOne({ email: decoded.email });
    const username = user.username;
    const useremail = user.email;
    res.json({ accessToken: newAccessToken, username, useremail });
  } catch (error) {
    console.log("Error in refreshing token : ", error);
    res.status(403).json({ message: "Invalid refresh token" });
  }
};

const logout = async (req, res) => {
  res.clearCookie("refreshToken", refreshToken, {
    httpOnly: true, // Prevent client-side access
    secure: true, // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
  });
  res.send("logout");
};

module.exports = { register, login, profile, refreshToken, logout };
