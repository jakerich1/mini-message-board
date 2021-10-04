/* eslint-disable consistent-return */
const passport = require('passport');
const passportJWT = require('passport-jwt');
const FacebookTokenStrategy = require('passport-facebook-token');
const User = require('./models/userModel');
require('dotenv').config();

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use('facebookToken', new FacebookTokenStrategy({
  clientID: '3058375291074190',
  clientSecret: '7aac6f5358f361d1fba7f9149c5f29a2',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check first for an existing user in the db
    const existingUser = await User.findOne({ 'facebook.id': profile.id });
    if (existingUser) {
      return done(null, existingUser);
    }

    // No existing user found, construct new user obj to add to DB
    const newUser = new User({
      method: 'facebook',
      facebook: {
        id: profile.id,
        email: profile.emails[0].value,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
      },
      profile_picture: './placeholder.png',
      created: new Date(),
      active: true,
      relationship_status: 'single',
    });

    // Save new user to DB and pass through User info
    await newUser.save();
    done(null, newUser);

    // Catch errors
  } catch (error) {
    done(error, false, error.message);
  }
}));

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT,
}, (jwtPayload, done) => done(null, jwtPayload)));
