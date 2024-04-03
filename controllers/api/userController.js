const router = require("express").Router();
const { Review, User, Book } = require("../../models");
const bcrypt = require("bcryptjs");

// Create a new user (Signup)
router.post("/", async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Proceed with creating a new user if the email doesn't exist
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.loggedIn = true;
      res.status(200).json(newUser);
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user. Please try again." });
  }
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      // If no user is found with the provided email
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    // Use the User model's checkPassword method to compare passwords
    const validPassword = user.checkPassword(password);

    if (!validPassword) {
      // If the password doesn't match
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    // If the email and password are correct, create a session
    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;

      res.json({
        user: { id: user.id, username: user.username, email: user.email },
        message: "You are now logged in!",
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in. Please try again." });
  }
});

// User logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    // Correctly check if user is logged in
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/home");
    return;
  }

  res.render("login");
});

// User login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }
    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Incorrect email or password." });
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true; 

      res.json({
        user: { id: user.id, username: user.username, email: user.email },
        message: "You are now logged in!",
      });
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in. Please try again." });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

router.post("/", async (req, res) => {
  try {
    // Check if the email already exists
    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Proceed with creating a new user if the email doesn't exist
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password, // Password will be hashed in the model's beforeCreate hook
    });

    // Respond with the new user's data, excluding the password
    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Error creating user. Please try again." });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] }, // Exclude passwords from the response
    });
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error getting users." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] }, // Exclude password from the response
    });

    if (!user) {
      res.status(404).json({ message: "No user found with this ID." });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error getting user." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    // Check if the email is being updated to a new value
    if (req.body.email) {
      const existingUser = await User.findOne({
        where: {
          email: req.body.email,
          id: { [Sequelize.Op.ne]: req.params.id }, // Exclude the current user from the check
        },
      });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "This email is already taken." });
      }
    }

    // Proceed with the update if the new email is not taken or if the email is not being changed
    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });

    if (updatedUser[0] === 0) {
      // If no rows were updated
      res.status(404).json({ message: "No user found with this id." });
      return;
    }

    res.json({ message: "User updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // Attempt to delete the user specified by the ID in the route parameter
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id, // Use the ID from the route parameter
      },
    });

    if (deleteUser === 0) {
      // If no user was deleted, respond with a 404 error
      res.status(404).json({ message: "No user found with this ID." });
      return;
    }

    // Respond to indicate the user was successfully deleted
    res.status(200).json({ message: "User deleted." });
  } catch (error) {
    console.error("Error deleting user:", error);
    // Respond with a 500 error and a generic error message
    res.status(500).json({ message: "Error deleting user. Please try again." });
  }
});

module.exports = router;
