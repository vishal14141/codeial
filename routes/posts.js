const express = require('express');

const router = express.Router();

const postController = require('../controllers/posts_controller');

router.get('/upload', postController.upload);
router.get('/delete', postController.delete);

module.exports = router;

