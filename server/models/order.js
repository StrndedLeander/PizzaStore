var mongoose = require('mongoose')
var Schema = mongoose.Schema

var OrderSchema = new Schema({
    first_name: String,
    last_name: String,
    adress:{city:String,street:String,streetNmbr:Number},
    size: Number,
    orderedToppings: [String],
    deliveryTime: {hour:Number,minute:Number}
},{collection: "orders"})

var Order = mongoose.model("OrderSchema",OrderSchema)
module.exports = Order