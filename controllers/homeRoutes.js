const router = require("express").Router();
const { Book, User } = require("../models");
const { loginUser } = require("./api/userController");
const withAuth = require("../utils/withAuth");

router.get("/", async (req, res) => {
  try {
    res.render("home", { logged_in: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting all users" });
  }
});

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

router.get("/user", async (req, res) => {
  const userFind = await User.findAll({
    include: [
      {
        model: Book,
      },
    ],
  });
  res.json(userFind);
});

router.get("/favorites", async (req, res) => {
  try {
    const newFavorites = await User.findByPk(req.session.userId, {
      attributes: { exclude: ["password"] },
      include: [{ model: Book }],
    });
    if (!newFavorites) {
      return res.status(404).json({ message: "No user found with this id!" });
    }
    const user = newFavorites.get({ plain: true });
    res.render("favorites", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
