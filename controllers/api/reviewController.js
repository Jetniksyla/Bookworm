const router = require("express").Router();
const { Review, User, Book } = require("../../models");

// GET Route for Fetching Reviews
router.get("/", async (req, res) => {
  try {
    const whereReview = req.query.book_id ? { book_id: req.query.book_id } : {};
    const reviews = await Review.findAll({
      where: whereReview,
      include: [User, Book],
      // Includes user and book details excluding sensitive information
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Error fetching reviews." });
  }
});

// Adding a GET Route to Fetch a Review by ID
router.get("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const review = await Review.findByPk(reviewId, {
      include: [
        { model: User, attributes: ["username"] }, // Including user data
        { model: Book, attributes: ["title"] }, // Including book data
      ],
    });

    if (!review) {
      return res.status(404).json({ message: "No review found with this ID." });
    }

    res.status(200).json(review);
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({ message: "Error fetching review." });
  }
});

// POST Route for Creating a New Review
router.post("/", async (req, res) => {
  try {
    // Creating the review
    const newReview = await Review.create(req.body);
    // Basic validation to ensure necessary fields are present
    if (!newReview) {
      return res.status(400).json({
        message: "Please provide userId, bookId, and content for the review.",
      });
    }

    // Respond with the created review
    res.status(201).json(newReview);
  } catch (error) {
    console.error("Error creating review:", error);
    // Generic error response
    res
      .status(500)
      .json({ message: "Error creating review. Please try again." });
  }
});

// PUT Route for Updating a Review
router.put("/:id", async (req, res) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: { id: req.params.id },
    });
    if (updatedReview[0] === 0) {
      res.status(404).json({
        message:
          "No review found with this id or no change made in the update.",
      });
      return;
    }
    res.status(200).json({ message: "Review updated successfully." });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Error updating review." });
  }
});

// DELETE route to delete a review by its ID

router.delete("/:id", async (req, res) => {
  try {
    const deletedReview = await Review.destroy({
      where: { id: req.params.id },
    });
    if (deletedReview === 0) {
      res.status(404).json({ message: "No review found with this id." });
      return;
    }
    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Error deleting review." });
  }
});

module.exports = router;
