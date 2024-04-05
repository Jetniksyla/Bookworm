// Import necessary modules and files
const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");
require("dotenv").config();
const apiKey = process.env.API_KEY;
// Database connection setup
const sequelize = require("./config/connection");

// Session store using sequelize for express-session
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Initialize express app
const app = express();
// Define the port to run the server on, defaulting to 3001 if not specified in environment
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers for rendering views
const hbs = exphbs.create({ helpers });

// Session configuration object
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,

    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

// Apply session middleware with session configuration
app.use(session(sess));

// Middleware for parsing JSON and urlencoded data and serving static files
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Endpoint to serve the API key to the client
app.get("/api/api-key", (req, res) => {
  res.json({ apiKey });
});

// Use routes from the controllers directory
app.use(routes);

// Synchronize all models with the database, then start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});
