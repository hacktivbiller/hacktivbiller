const { AX_ZOMATO } = require('../api/myaxios')

class ApiController {
    static getRecipeById(req, res) {
        const restaurantId = req.query.q
        console.log(restaurantId)
        AX_ZOMATO
        .get(`/search?q=${restaurantId}&count=1`)
        .then(({data}) => {
            console.log(data)
            if(data) {
                res.status(200).json(data)
            }else{
                res.status(400).json({'message': 'No result'})
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })

    }

}

module.exports = ApiController
