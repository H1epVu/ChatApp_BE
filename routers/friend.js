const express = require('express');
const friendController = require('../controllers/friend')

const router = express.Router();

router.post('/reject', friendController.rejectReq)
router.post('/accept', friendController.acceptReq)
router.post('/send', friendController.sendReq)
router.get('/invited/:userId', friendController.receiveReq)
router.get('/:userId', friendController.getListFriends)

module.exports = router;