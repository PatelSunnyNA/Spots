const {spotSchema, thoughtSchema} = require('./schemas')
const ExpressError = require('./utils/ExpressError')
const catchAsync = require('./utils/catchAsync')
const Spot = require('./models/spot')
const Thought = require('./models/thought')

module.exports.validateThought = (req, res, next) => {
    const { error } = thoughtSchema.validate(req.body);
    console.log(error)
    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}




module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnTo = req.originalUrl
    req.flash("error", " You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.validateSpot = (req, res, next) => {
  const { error } = spotSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const spot = await Spot.findById(id);
  if (!spot.author.equals(req.user._id)) {
    req.flash("error", "Not authorized to complete that action");
    return res.redirect(`/spots/${id}`);
  }
  next();
};

module.exports.isThoughtAuthor = async (req, res, next) => {
  const { id ,thoughtId } = req.params;
  const thought = await Thought.findById(thoughtId);
  if (!thought.author.equals(req.user._id)) {
    req.flash("error", "Not authorized to complete that action");
    return res.redirect(`/spots/${id}`);
  }
  next();
}