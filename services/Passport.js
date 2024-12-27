const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/userModel');

passport.use(
  new GoogleStrategy(
    { clientID: '1066587402989-brt5kvfuq8f683roe2fm8l0lqccvl5v4.apps.googleusercontent.com', clientSecret: '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', callbackURL: '/auth/google/callback' },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      let user = await User.findOne({ email, provider: 'google' });
      if (!user) user = await User.create({ email, provider: 'google', verified: true });
      done(null, { token: jwt.sign({ id: user._id }, JWT_SECRET) });
    }
  )
);

