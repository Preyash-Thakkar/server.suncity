// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Admin = require('../models/suncityAdmin');

passport.use(
  new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    try {
      const user = await Admin.findOne({ email });

      if (!user || !user.comparePassword(password)) {
        return done(null, false, { message: 'Invalid email or password' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  Admin.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
