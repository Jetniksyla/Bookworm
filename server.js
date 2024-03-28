const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const routes = require("./controllers");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));
// Configure Handlebars engine
// Configure Handlebars engine
app.engine(
  "handlebars",
  hbs.engine // Use the hbs variable here instead of exphbs()
);
app.set("view engine", "handlebars"); // Set Handlebars as the view engine
app.set("views", path.join(__dirname, "views")); // Set the views directory


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Route handling
app.use("/", routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
});









/* Layout
│
├── config/
│   └── connection.js
│
├── controllers/
│   ├── api/
│   │   ├── bookController.js
│   │   ├── reviewController.js
│   │   └── userController.js
│   ├──homeRoutes.js 
│   └── index.js
│
├── db/
│   └── schema.sql
│
├── models/
│   ├── Book.js
│   ├── index.js
│   ├── User.js
│   └── Review.js
│
├── node_modules
│
├── public/
│   ├── css/
│   │   ├── sass.css
│   │   └── style.css
│   └── js/
│       ├── homeAPI.js
│       ├── login.js
│       └── signup.js
│
├── seeds/
│   ├── bookData.json
│   ├── index.js
│   ├── reviewData.json
│   └── userData.json
│
├── utils/
│   └── helpers.js
│
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── partials/
│   │   ├── login.handlebars
│   │   └── footer.handlebars
│   └── home.handlebars
│
├── .env
├── .envEXAMPLE
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── server.js
└── package.json

*/
