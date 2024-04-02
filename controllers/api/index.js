const express = require("express");
const router = express.Router();

const bookController = require("./bookController");
const reviewController = require("./reviewController");
const userController = require("./userController");

router.use("/books", bookController);
router.use("/reviews", reviewController);
router.use("/users", userController);

module.exports = router;
