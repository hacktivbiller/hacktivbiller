const mongoose = require('mongoose')

let cartSchema = mongoose.Schema({
    userId : String,
    restaurantId : Number,
    itemId : Number,
    itemName : String,
    itemImage : String,
    itemPrice : Number
})

let Cart = mongoose.model('carts', cartSchema)

module.exports = Cart