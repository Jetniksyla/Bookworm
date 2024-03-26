const express = require("express");
const router = express.Router();

const bookController = require("./api/bookController");
router.use("/api/books", bookController);

const reviewController = require("./api/reviewController");
router.use("/api/reviews", reviewController);

const userController = require("./api/userController");
router.use("/api/users", userController);

const homeRoutes = require("./homeRoutes");
router.use("/", homeRoutes);

module.exports = router;
