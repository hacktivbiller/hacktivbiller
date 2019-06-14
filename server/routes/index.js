const router = require('express').Router()
const users = require('./users')
const ApiController = require('../controllers/ApiController')
const cartRoute = require('./cartRoutes')
const gImageRoute = require('./gImageRoutes')

router.use('/users', users)
router.get('/api/getRecipe', ApiController.getRecipeById)

router.use('/cart', cartRoute)

router.use('/gImage', gImageRoute)

module.exports = router