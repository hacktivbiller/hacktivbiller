const router = require('express').Router()
const cartRoute = require('./cartRoutes')
const gImageRoute = require('./gImageRoutes')

router.use('/cart', cartRoute)

router.use('/gImage', gImageRoute)

module.exports = router