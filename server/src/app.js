const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

//Connect to database via mongodbConnectionModule.js
const mongodb_conn_module = require('./mongodbConnectionModule');
var db = mongodb_conn_module.connect();

//CRUD Orders
var Order = require('../models/order')

app.post('/management/orders', (req, res) => {
    var db = req.db
    var first_name = req.body.first_name
    var last_name = req.body.last_name
    var adrCity = req.body.adress.city
    var adrZip = req.body.adress.zip
    var adrStreet = req.body.adress.street
    var adrStreetNmbr = req.body.adress.streetNmbr
    var pizzaSize = req.body.size
    var orderedToppingsTopping = req.body.orderedToppings
    var deliveryTime = req.body.deliveryTime
    var price = req.body.price

    var newOrder = new Order({
        first_name: first_name,
        last_name: last_name,
        adress: { city: adrCity, zip: adrZip, street: adrStreet, streetNmbr: adrStreetNmbr },
        size: pizzaSize,
        orderedToppings: orderedToppingsTopping,
        deliveryTime: deliveryTime,
        price: price
    })

    newOrder.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'Order went in successfully!'
        })
    })
})

app.get('/management/orders', (req, res) => {
    Order.find({}, function (error, orders) {
        if (error) {
            console.log(error)
        }
        res.send({
            orders: orders
        })
    }).sort({ deliveryTime: +1 })
})

app.get('/management/orders/:id', (req, res) => {
    var db = req.db
    Order.findById(req.params.id, function (error, order) {
        if (error) {
            console.log(error)
        }
        res.send(order)
    })
})

app.put('/management/orders/:id', (req, res) => {
    var db = req.db
    Order.findById(req.params.id, function (error, order) {
        if (error) {
            console.log(error)
        }
        order.first_name = req.body.first_name,
            order.last_name = req.body.last_name,
            order.adress = req.body.adress,
            order.pizzaSize = req.body.size,
            order.orderedToppings = req.body.orderedToppings,
            order.deliveryTime = req.body.deliveryTime,
            order.price = req.body.price
        order.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

app.delete('/management/orders/:id', (req, res) => {
    var db = req.db
    Order.remove({
        _id: req.params.id
    }, function (error, order) {
        if (error) {
            res.send(error)
        }
        res.send({
            success: true
        })
    })
})
//CRUD Toppings
var Topping = require('../models/topping')

app.post('/management/toppings', (req, res) => {
    var db = req.db
    var topping = req.body.topping
    var price = req.body.price

    var newTopping = new Topping({
        topping: topping,
        price: price
    })
    newTopping.save(function (error) {
        if (error) {
            console.log(error)
        }
        res.send({
            success: true,
            message: 'A new topping was added successfully to the menu!'
        })
    })
})

app.get('/management/toppings', (req, res) => {
    Topping.find({}, function (error, toppings) {
        if (error) {
            console.log(error)
        }
        res.send({
            toppings: toppings
        })
    }).sort({ _id: -1 })
})

app.get('/management/toppings/:id', (req, res) => {
    var db = req.db
    Topping.findById(req.params.id, function (error, topping) {
        if (error) {
            console.error(error)
        }
        res.send(topping)
    })
})

app.put('/management/toppings/:id', (req, res) => {
    var db = req.db
    Topping.findById(req.params.id, function (error, topping) {
        if (error) {
            console.log(error)
        }
        topping.topping = req.body.topping
        topping.price = req.body.price
        post.save(function (error) {
            if (error) {
                console.log(error)
            }
            res.send({
                success: true
            })
        })
    })
})

app.delete('management/toppings/:id', (req, res) => {
    var db = req.db
    Topping.remove({
        _id: req.params.id
    }, function (error, topping) {
        if (errpr) {
            res.send(error)
        }
        res.send({
            success: true
        })
    })
})
app.listen(process.env.PORT || 8081)