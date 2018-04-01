var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ToppingSchema = new Schema({
    topping: String,
    price: Number
},{collection: "toppings"})

var Topping = mongoose.model("ToppingSchema",ToppingSchema)
module.exports = Topping