const { authJwt , verifySignUp} = require("../middlewares");
const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken")
const passport = require("passport");

require("../services/passportConfig")(passport);


  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  // Redirect the user to the Google signin page 
  router.get(
    "/google",
    passport.authenticate("google", { scope: ["email", "profile"] })
   );
 // Retrieve user data using the access token received 
// Auth Callback
router.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/callback/success',
        failureRedirect: '/auth/google/callback/failure'
}));
  
// Success 
router.get('/google/callback/success' , async(req , res) => {
    if(!req.user)
        res.redirect('/google/callback/failure');
    res.send("Welcome " + req.user.google.email);
});
  
// failure
router.get('/callback/failure' , (req , res) => {
    res.send("Error");
})

  // profile route after successful sign inem> 
  router.get("/profile", 
  [authJwt.verifyToken],  
  (req, res) => {
    res.send(`<h1 id="welcome">"Welcome: " + req.user.google.name</h1>`);
  });


module.exports = router

