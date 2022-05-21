const express = require('express');
const passport = require('passport');

const router = express.Router();

const postController = require('../controllers/posts_controller');
const commentController = require('../controllers/comments_controller');


router.post('/create-post', passport.checkAuthentication,postController.createPost);
router.post('/add-comment', passport.checkAuthentication, commentController.addComment);
router.get('/destroy/:id', passport.checkAuthentication, postController.destroy);

module.exports = router;

