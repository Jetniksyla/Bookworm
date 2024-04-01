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

// router.get("/favorites", async (req, res) => {
//   if (!req.session.userId) {
//     return res.redirect("/login");
//   }

//   try {
//     const userData = await User.findByPk(req.session.userId, {
//       include: [{ model: Book, as: "books" }],
//     });

//     if (!userData) {
//       return res.status(404).send("No user found with this id!");
//     }

//     const user = userData.get({ plain: true });

//     console.log(user.books);
//     res.render("favorites", {
//       books: user.books,
//       logged_in: req.session.loggedIn || false,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json(err);
//   }
// });

router.get("/favorites", async (req, res) => {
  try {
    console.log("Session User ID:", req.session.userId);
    const userData = await User.findByPk(req.session.userId, {
      include: ["books"], // Adjust based on actual association
    });
    console.log("Fetched userData:", userData);

    if (userData) {
      const user = userData.get({ plain: true });
      console.log("User with Books:", user);
      res.render("favorites", {
        books: user.books || [],
        logged_in: req.session.loggedIn || false,
      });
    } else {
      res.status(404).send("No user found with this id!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
