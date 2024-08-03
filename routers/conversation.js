const express = require('express');
const convController = require('../controllers/conversation')

const router = express.Router();

router.post('/create', convController.createConv)

module.exports = router;