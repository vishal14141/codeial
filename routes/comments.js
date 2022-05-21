const express = require('express');
const passport = require('passport');

const router = express.Router();

const commentController = require('../controllers/comments_controller');

router.get('/destroy/:id', passport.checkAuthentication, commentController.destroy);
router.post('/add-comment', passport.checkAuthentication, commentController.addComment);

module.exports = router;