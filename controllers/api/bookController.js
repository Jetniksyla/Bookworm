// Exporting  all the modules
const router = require("express").Router();
const { Review, User, Book } = require("../../models");
const withAuth = require("../../utils/withAuth");


// GET route: Get all books including associated reviews and reviewers' usernames
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll();
    res.status(200).json(bookData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route: Get a single book with ID including associated reviews and reviewers' usernames
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

// POST route: Create a new book with a user ID and required fields
router.post("/", withAuth, async (req, res) => {
  console.log(req.body);
  try {
    const { title, author, img, description, publishedDate } = req.body;

    if (!title || !author || !img || !description || !publishedDate) {
      return res.status(400).json({
        message:
          "Please provide all required fields: title, author, published date, cover image, and description.",
      });
    }

    const newBook = await Book.create({
      title: title,
      author: author,
      cover_image: img,
      description: description,
      published_date: publishedDate,
      user_id: req.session.userId,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Error creating book. Please try again." });
  }
});

// PUT route: Update a book with given ID
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

// DELETE route: Delete a book with given ID
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
