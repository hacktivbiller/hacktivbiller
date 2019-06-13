const express = require('express').Router();
const router = express
const UserController = require('../controllers/userControllers')

router.get('/', UserController.list)
router.post('/login', UserController.login)
router.post('/loginGoogle', UserController.loginGoogle)
router.post('/register', UserController.register)

module.exports = router