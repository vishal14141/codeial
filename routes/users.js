const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

router.get('/profile/:id',passport.checkAuthentication,usersController.profile);

router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: 'login'},
),usersController.createSession);

router.get('/login',passport.shouldRenderNext, usersController.login);
router.get('/register',passport.shouldRenderNext, usersController.register);
router.post('/createUser',passport.checkAuthentication, usersController.createUser);
router.post('/update/:id', passport.checkAuthentication, usersController.updateProfile);


router.get('/sign-out', usersController.destroySession);

module.exports = router;