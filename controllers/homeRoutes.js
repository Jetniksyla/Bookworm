const router = require("express").Router();
const { Book } = require("../models");
router.get("/", async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting all users" });
  }
});

router.get("/book", async (req, res) => {
  try {
    const bookData = await Book.findAll() 
    res.json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
