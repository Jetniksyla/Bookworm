// Importing models
const User = require("./User"); // Import the User model
const Book = require("./Book"); // Import the Book model
const Review = require("./Review"); // Import the Review model

// Defining associations between models
User.hasMany(Book, { foreignKey: "user_id", as: "books", onDelete: "CASCADE" }); // A user can have many Books
Book.belongsTo(User, { foreignKey: "user_id", as: "user" }); // Each Book belongs to a user

Book.hasMany(Review, { foreignKey: "book_id", onDelete: "CASCADE" }); // A Book can have many Review
Review.belongsTo(Book, { foreignKey: "book_id" }); // Each Review belongsTo Book

User.hasMany(Review, { foreignKey: "user_id", onDelete: "CASCADE" }); // A user can have many Review
Review.belongsTo(User, { foreignKey: "user_id" }); // Each Review belongs to a user

// Exporting models and associations
module.exports = {
  User,
  Book,
  Review,
};
