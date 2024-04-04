// Import required modules
const router = require("express").Router();
const { Book, User } = require("../models");
const { loginUser } = require("./api/userController");
const withAuth = require("../utils/withAuth");

// Root route to render home page
router.get("/", (req, res) => {
  // Log the session's loggedIn property for debugging purposes
  console.log(req.session.loggedIn);
  try {
    // Render home page with logged_in and user_id session variables
    res.render("home", {
      logged_in: req.session.loggedIn,
      user_id: req.session.userId,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting all users" });
  }
});

// Get all books with associated user email
router.get("/book", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: User,
          attributes: ["email"],
        },
      ],
    });
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

// Render the signup page
router.get("/signup", (req, res) => {
  try {
    res.render("signup");
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error rendering the signup page." });
  }
});

// Get and render favorites page
router.get("/favorites", async (req, res) => {
  if (!req.session.userId) {
    return res.redirect("/login");
  }
  // Find user data with associated books
  try {
    const userData = await User.findByPk(req.session.userId, {
      include: [{ model: Book, as: "books" }],
    });

    if (!userData) {
      return res.status(404).send("No user found with this id!");
    }

    // Convert the user data to plain JavaScript object
    const user = userData.get({ plain: true });

    console.log(user.books);
    res.render("favorites", {
      books: user.books,
      logged_in: req.session.loggedIn || false,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Render contact form page
router.get("/contactForm", async (req, res) => {
  res.render("contactForm");
});

// Default route to redirect to home page
router.post("/", (req, res) => {
  res.redirect("/");
});

module.exports = router;
