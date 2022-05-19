const express = require('express');
const passport = require('passport');

const router = express.Router();

const postController = require('../controllers/posts_controller');

router.get('/upload', postController.upload);
router.get('/delete', postController.delete);
router.post('/create-post', passport.checkAuthentication,postController.createPost);

module.exports = router;

