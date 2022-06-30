module.exports = {
  hasAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).json({
        status: "Access Forbiden",
        message: "To be able to use this endpoint, you must login first",
      });
    }

    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
    res.redirect("/");
  },
};
