const Cart = require('../models/cart')

class CartController {

    static add(req, res){
        let newCart = new Cart ({
            userId : req.body.userId,
            restaurantId : req.body.restaurantId,
            itemId : req.body.itemId,
            itemName : req.body.itemName,
            itemImage : req.body.itemImage,
            itemPrice : req.body.itemPrice,
        })

        newCart.save()
            .then( cart => {
                res.status(201).json(cart)
            })
            .catch( err => {
                res.status(500).json({ msg : 'internal server error' })
            })
    }

    static delete(req, res){
        Cart.deleteOne({
            _id : req.params.id
        })
            .then(deleted => {
                res.status(200).json({ messege : 'success delete'})
            })
            .catch(err => {
                res.status(500).json({ message : 'internal server error'})
            })
    }       
}

module.exports = CartController