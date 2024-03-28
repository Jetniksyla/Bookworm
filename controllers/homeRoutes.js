const router = require("express").Router();
const { Book } = require("../models");
const { loginUser } = require('./api/userController'); 

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
    const bookData = await Book.findAll();
    res.json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the login page
router.get("/login", (req, res) => {
  try {
    res.render("login"); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rendering the login page." });
  }
});


router.get("/signup", (req, res) => {
  try {
    res.render("signup"); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rendering the signup page." });
  }
});



module.exports = router;
