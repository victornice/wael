const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('./database');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    // Local Strategy
    passport.use(new LocalStrategy({usernameField: 'email'},(email, password, done) => {
        let query = {email: email}
        User.findOne(query, (err, user) => {
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: 'Wrong email or password'});
            }

            // Match Password
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (isMatch) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'Wrong email or password'})
                }
            });
        });
    }));
    
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}