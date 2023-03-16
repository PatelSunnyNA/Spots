const catchAsync = require("../utils/catchAsync");
const Spot = require("../models/spot");
const Thought = require("../models/thought");

module.exports.postThought = catchAsync(async (req, res) => {
  const spot = await Spot.findById(req.params.id);
  const thought = new Thought(req.body.thought);
  thought.author = req.user._id;
  spot.thoughts.push(thought);
  await thought.save();
  await spot.save();
  res.redirect(`/spots/${spot._id}`);
});

module.exports.deleteThought = catchAsync(async (req, res, nex) => {
  const { id, thoughtId } = req.params;
  Spot.findByIdAndUpdate(id, { $pull: { thoughts: thoughtId } });
  await Thought.findByIdAndDelete(req.params.thoughtId);
  res.redirect(`/spots/${id}`);
});
