// Middleware to protect routes that require authentication. Redirects to login if not logged in; otherwise, proceeds.
const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the request to the login route
  if (!req.session.loggedIn) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = withAuth;
