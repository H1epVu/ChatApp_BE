const express = require('express');
const userController = require('../controllers/user')

const router = express.Router();

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/:userId', userController.getUserById)
router.get('/', userController.getAllUsers)

module.exports = router;