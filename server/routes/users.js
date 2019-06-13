const express = require('express').Router();
const router = express
const UserController = require('../controllers/userControllers')

routes.get('/', UserController.list)
routes.post('/login', UserController.login)
routes.post('/loginGoogle', UserController.loginGoogle)
routes.post('/register', UserController.register)

module.exports = router