var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OrderSchema = new Schema({
    first_name: String,
    last_name: String,
    adress: { city: String, zip: Number, street: String, streetNmbr: Number },
    size: Number,
    orderedToppings: [String],
    deliveryTime: String,
    price: Number
}, { collection: "orders" })

var Order = mongoose.model("OrderSchema", OrderSchema)
module.exports = Order