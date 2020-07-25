const express = require('express');

const router = express.Router();

const bookController = require('../controllers/bookController');

router.get('/book', bookController.getAllBooks);
router.get('/book/:ISBN', bookController.getBookFromISBN);
router.post('/bookPrice', bookController.getBookPrice);

module.exports = router;
