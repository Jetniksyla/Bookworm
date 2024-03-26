// Importing seed functions for users, blogs, and comments
const sequalize = require("../config/connection");
const bookData = require("./bookData.json"); // Importing seed function for
const bookReview = require("./reviewData.json"); // Importing seed function for reviews
const bookUsers = require("./userData.json"); // Importing seed function for users
const { User, Book, Review } = require("../models");

// Function to seed all data
const seedAll = async () => {
  // Call each seed function sequentially
  await sequalize.sync({ force: true }); // Clear out database before importing new data
  const users = await User.bulkCreate(bookUsers);
  for (const book of bookData) {
    await Book.create({
      ...book,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

await Review.bulkCreate(bookReview);

  console.log("All seed data inserted successfully!"); // Log success message
  process.exit(0); // Exit process
};

// Call seedAll function to start seeding process
seedAll();
