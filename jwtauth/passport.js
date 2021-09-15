const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const bcrypt = require("bcryptjs");
const User = require('./models/userModel');

passport.use(
    new LocalStrategy((username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) return done(err);
            if (!user) return done(null, false, { message: "Incorrect username" });
            
            bcrypt.compare(password, user.password, (err, match) => {
                if(err) return done(err);
                if (!match) return done(null, false, { message: "Incorrect password" });
                return done(null, user)   ;
            })
        });
    })
);

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey : 'test'
    },(jwtPayload, done) => {
       return done(null, jwtPayload)
    })
);