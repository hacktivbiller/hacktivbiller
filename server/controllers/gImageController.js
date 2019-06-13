const axios = require('axios')

const ax = axios.create({
    baseURL : 'https://api.serpwow.com/live'
})

class GImageController{
    static search(req, res){
        ax.get(`/search?api_key=${process.env.SERPWOW_API_KEY}&q=${req.params.content}&search_type=images`)
            .then(({ data }) => {
                res.status(200).json(data)
            })
            .catch( err => {
                console.log(err.message)
                res.status(500).json({ msg : 'internal server error' })
            })
    }
}

module.exports = GImageController