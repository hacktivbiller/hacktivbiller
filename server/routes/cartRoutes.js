const route = require('express').Router()
const CartController = require('../controllers/cartController')

route.post('/add', CartController.add)

route.delete('/:id', CartController.delete)

module.exports = route