const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    res.render("home");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error getting all users" });
  }
});
