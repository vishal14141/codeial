const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile',usersController.profile);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: 'login'},
),usersController.createSession);

router.get('/login', usersController.login);
router.get('/register', usersController.register);
router.post('/createUser', usersController.createUser);

module.exports = router;