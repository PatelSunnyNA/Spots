const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");
const AuthController = require("../controllers/auth");

router
  .route("/register")
  .get(AuthController.renderRegistrationForm)
  .post(AuthController.registerUser);

router
  .route("/login")
  .get(AuthController.renderLoginForm)
  .post(
    passport.authenticate("local", {
      failureFlash: true,
      failureRedirect: "/login",
    }),
    AuthController.loginUser
  );

router.route("/logout").get(AuthController.logoutUser);
module.exports = router;
