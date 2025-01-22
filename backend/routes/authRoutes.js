const express = require("express");
const auth = require("../controller/authController");

const authRouter = express.Router();

// Register user
authRouter.post("/register", auth.register);

// Login user
authRouter.post("/login", auth.login);

// Get user profile (protected route)
authRouter.get("/profile", auth.profile);

authRouter.get("/refresh-token", auth.refreshToken);

authRouter.get("/logout", auth.logout);

module.exports = authRouter;
