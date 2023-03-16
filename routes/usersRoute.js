const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController')
const redirectMiddleware = require('../middlewares/redirectMiddleware')

router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.loginUser);
router.route('/dashboard').get(usersController.getDashboardPage);
router.route('/logout').get(usersController.logOutUser);







module.exports = router;
