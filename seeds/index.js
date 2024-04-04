// Seeds database with user, book, and review data from JSON files, ensuring all data is linked and consistent.
const sequalize = require("../config/connection");
const bookData = require("./bookData.json");
const bookReview = require("./reviewData.json");
const bookUsers = require("./userData.json");
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

  // Inserts multiple review records into the database from the bookReview JSON data using Sequelize's bulkCreate method.
  await Review.bulkCreate(bookReview);

  console.log("All seed data inserted successfully!");
  process.exit(0); // Exit process
};

seedAll();
