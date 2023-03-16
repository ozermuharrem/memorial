const express = require('express')
const pageController = require('../controllers/pageController');
const pathMiddleware = require('../middlewares/pathMiddleware')
const router = express.Router();


router.route('/').get(pageController.getIndexPage);
router.route('/singleBook/:id').get(pageController.getSinglePage);
router.route('/register').get(pageController.registerPage);
router.route('/login').get(pageController.loginPage);
router.route('/createBook').post(pageController.createBook);
router.route('/delete/:_id').get(pageController.deleteBook);
router.route('/update/:_id').post(pageController.updateBook);








module.exports = router;
