const router = require("express").Router();
const { Review, User, Book } = require("../../models");
const withAuth = require("../../utils/withAuth");

router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll();
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          as: "reviews",
          include: [{ model: User, attributes: ["username"] }],
        },
      ], // Including reviews and reviewer's username
    });
    if (!bookData) {
      res.status(404).json({ message: "No book found with this id!" });
      return;
    }
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new book
router.post("/", withAuth, async (req, res) => {
  try {
    const { title, author, published_date, cover_image, description } =
      req.body; // Adjusted field names

    if (!title || !author || !published_date || !cover_image || !description) {
      return res.status(400).json({
        message:
          "Please provide all required fields: title, author, published date, cover image, and description.",
      });
    }

    const newBook = await Book.create({
      ...req.body,
      user_id: req.session.userId,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book. Please try again." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const book = await Book.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!book[0]) {
      res.status(404).json({ message: "No book found with this id!" });
      return;
    }
    res.status(200).json(book);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const bookData = await Book.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!bookData) {
      res.status(404).json({ message: "No book found with this id!" });
      return;
    }
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
