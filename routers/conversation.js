const express = require('express');
const convController = require('../controllers/conversation')

const router = express.Router();

router.post('/add', convController.createConv)
router.get('/getConv', convController.getConv)
router.get('/', convController.getAllConvs)

module.exports = router;