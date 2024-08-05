const express = require('express');
const messageController = require('../controllers/message')

const router = express.Router();

router.post('/send', messageController.sendMess)
router.get('/:conversationId', messageController.getMess)

module.exports = router;