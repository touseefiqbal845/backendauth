const express = require('express');
const passport = require('passport');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);
router.post('/verify', userController.verify);
router.post('/login', userController.login);
router.get('/google', passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback', passport.authenticate('google'), userController.googleCallback);
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback', passport.authenticate('facebook'), userController.facebookCallback);
router.get('/linkedin', passport.authenticate('linkedin', { scope: ['r_emailaddress'] }));
router.get('/linkedin/callback', passport.authenticate('linkedin'), userController.linkedinCallback);

module.exports = router;
