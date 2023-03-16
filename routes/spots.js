const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");
const Spot = require("../models/spot");
const { spotSchema } = require("../schemas.js");
const { isLoggedIn, validateSpot, isAuthor } = require("../middleware.js");
const SpotController = require("../controllers/spots");

router
  .route("/")
  .get(SpotController.index)
  .post(isLoggedIn, validateSpot, SpotController.createNewSpot);

router.route("/new").get(isLoggedIn, SpotController.renderCreateForm);

router
  .route("/:id")
  .get(isLoggedIn, SpotController.showSpot)
  .put(isLoggedIn, isAuthor, validateSpot, SpotController.editSpot)
  .delete(isLoggedIn, isAuthor, SpotController.deleteSpot);

router.get("/:id/edit", isLoggedIn, isAuthor, SpotController.renderEditForm);

module.exports = router;
