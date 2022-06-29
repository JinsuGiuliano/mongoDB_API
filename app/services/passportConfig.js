const GoogleStrategy = require("passport-google-oauth2").Strategy;
const { User } = require("../models/user.model");
// const JwtStrategy = require("passport-jwt").Strategy;
// const { ExtractJwt } = require("passport-jwt");
const setupUser = require('../services/userSetup')
module.exports = (passport) => {

  
    passport.serializeUser((user , done) => {
        done(null , user);
    })
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
  

    passport.use(
        new GoogleStrategy({
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/google/callback",
            passReqToCallback : true
        },

        async (request, accessToken, refreshToken, profile, done) => {
        try {
            let existingUser = await User.findOneAndUpdate({ 'google.id': profile.id },
                {
                    $set: {
                            'username': profile.emails[0].value ,
                            'google.id': profile.id,
                            'google.name': profile.displayName,
                            'google.email': profile.emails[0].value,
                            'google.photo': profile.photos[0].value
                        }
                    }
                    )
            // if user exists return the user 
            if (existingUser) {
             
                console.log('User found: ', existingUser)
                return done(null, existingUser);
            }
            // if user does not exist create a new user 
            console.log('Creating new user...', profile);

            const newUser = new User({
                method: 'google',
                username: profile.emails[0].value ,
                google: {
                    id: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    photo: profile.photos[0].value
                    }

            });
            await newUser.save();
            await setupUser(newUser._id.toString())
            return done(null, newUser);
        } catch (error) {
            return done(error, false)
        }
        }
        ));
    

   }