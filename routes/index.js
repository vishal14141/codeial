const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

router.get('/',homeController.home);

//If any request comes with users , it will require ./users
router.use('/users', require('./users'));

router.use('/posts', require('./posts'));
router.use('/comments', require('./comments'));

router.use('/api', require('./api'));

//For ant other routes
//router.use('/routerName', require('routerFile));

module.exports = router;