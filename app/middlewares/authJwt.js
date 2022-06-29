const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;


 const verifyToken = (req, res, next) => {
  let token = req.user
  console.log(req.user)
  if (!token) {
    return res.status(403).send({ message: "No se ha proveido ningún Token!" });
  }
  // User.findById(req.user.google.id).exec((err, user) => {
  //   if (err) {
  //     res.status(500).send({ message: err });
  //     return;
  //   }
    next();
  };

// const isUser = (req, res, next) => {
 
//     next();
//   });
 
// }

const authJwt = {
  verifyToken
};
module.exports = authJwt;