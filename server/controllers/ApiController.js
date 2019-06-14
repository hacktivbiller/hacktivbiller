const { AX_ZOMATO } = require('../api/myaxios')

class ApiController {
    static getRecipeById(req, res) {
        const restaurantId = req.query.q
    
        AX_ZOMATO
        .get(`/search?q=${restaurantId}`)
        .then(recipes => {
            if(recipes) {
                res.status(200).json(recipes)
            }else{
                res.status(400).json({'message': 'No result'})
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })

    }
}

module.exports = ApiController
