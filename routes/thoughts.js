const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  validateThought,
  isLoggedIn,
  isThoughtAuthor,
} = require("../middleware");
const ThoughtController = require("../controllers/thoughts");

router.post("/", validateThought, isLoggedIn, ThoughtController.postThought);

router.delete(
  "/:thoughtId",
  isLoggedIn,
  isThoughtAuthor,
  ThoughtController.deleteThought
);

module.exports = router;
