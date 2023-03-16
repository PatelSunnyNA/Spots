const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Spot = require("../models/spot");
const { spotSchema } = require("../schemas.js");

module.exports.index = catchAsync(async (req, res) => {
  const spots = await Spot.find({});
  res.render("spots/index", { spots });
});

module.exports.renderCreateForm = (req, res) => {
  res.render("spots/new");
};

module.exports.createNewSpot = catchAsync(async (req, res) => {
  const spot = new Spot(req.body.spot);
  spot.author = req.user._id;
  await spot.save();
  res.redirect(`/spots/${spot._id}`);
});

module.exports.showSpot = catchAsync(async (req, res) => {
  const spot = await Spot.findById(req.params.id)
    .populate({
      path: "thoughts",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  res.render("spots/show", { spot });
});

module.exports.renderEditForm = catchAsync(async (req, res) => {
  const spot = await Spot.findById(req.params.id);
  res.render("spots/edit", { spot });
});

module.exports.editSpot = catchAsync(async (req, res) => {
  const { id } = req.params;
  const spot = await Spot.findByIdAndUpdate(id, { ...req.body.spot });
  res.redirect(`/spots/${spot._id}`);
});

module.exports.deleteSpot = catchAsync(async (req, res) => {
  const { id } = req.params;
  await Spot.findByIdAndDelete(id);
  res.redirect("/spots");
});
