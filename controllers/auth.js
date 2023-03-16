const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

module.exports.renderLoginForm =(req, res) => {
  res.render("users/login");
}

module.exports.loginUser =catchAsync(async (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || '/spots'
    delete req.session.returnTo;
    res.redirect(redirectUrl);
  })

module.exports.renderRegistrationForm =(req, res) => {
  res.render("users/register");
}

module.exports.registerUser =catchAsync(async (req, res) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      req.login(registeredUser, (err) => {
        if (err) return next(err);
        req.flash("success", "Welcome!");
        res.redirect("/spots");
      });
    } catch (error) {
      req.flash("error", error.message);
      res.redirect("/register");
    }
  })

module.exports.logoutUser =(req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.flash('success', "Goodbye!");
    res.redirect('/spots');
  });
}