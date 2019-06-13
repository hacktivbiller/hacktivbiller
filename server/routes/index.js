const router = require('express').Router()
const users = require('./users')
const ApiController = require('../controllers/ApiController')

router.use('/users', users)
router.get('/api/getRecipe', ApiController.getRecipeById)

module.exports = router