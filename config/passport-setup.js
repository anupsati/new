
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) =>{
    done(null, user.id);
})
passport.deserializeUser((id, done) =>{
    User.findById(id).then((user)=>{
        done(null, user);
    })
})


passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
       //Check if user already exists in the db
       console.log(profile)

       User.findOne({googleid:profile.id}).then((currentUser)=>{
            if(currentUser){
                //already has the user
                console.log('user is ' + currentUser)
                done(null, currentUser);
            }else{
                //if not create a user
                new User({
                    username:profile.displayName,
                    googleid:profile.id,
                    thumbnail:profile._json.image.url
                }).save().then((newUser)=>{
                    console.log(newUser + 'Created')
                   done(null, newUser);
                })
            }

       })

    })
);