const GImageController = require('../controllers/gImageController')
const router = require('express').Router()

router.get('/:content', GImageController.search)

module.exports = router