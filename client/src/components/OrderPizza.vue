<template>
    <div id="home">
        <h1>Pizza</h1>
        <div class="container">
            <form name="pizzaForm">
                <div class="form-group form-inline">
                    <label for="firstName">First Name</label>
                    <input required type="text" class="form-control" v-model="first_name" placeholder="Enter your first name">
                </div>
                <div class="form-group form-inline">
                    <label for="lastName">Last Name</label>
                    <input required type="text" class="form-control" v-model="last_name" placeholder="Enter your last name">
                </div>
                <div class="form-group form-inline">
                    <label for="adrCity">City</label>
                    <input required type="text" class="form-control" v-model="adress.city" placeholder="City">
                    <input required type="text" id="zipInput" required class="form-control" v-model="adress.zip" placeholder="ZIP">
                </div>
                <div class="form-group form-inline">
                    <label for="adrStreetStreetNmbr">Street</label>
                    <input required type="text" class="form-control" v-model="adress.street" placeholder="Street">
                    <input id="streetNumber" required type="text" class="form-control" v-model="adress.streetNmbr" placeholder="Nr">
                </div>
                <div class="form-group form-inline">
                    <label for="choosePizzSize">Pizza Size</label>
                    <b-form-select v-model="selectedSize">
                        <option v-for="pizzaOption in pizzaSicePrice">{{pizzaOption.option}}</option>
                    </b-form-select>
                    </label>
                </div>
                <div class="form-group form-inline">
                    <table id="toppingTable" class="table table-bordered">
                        <thead class="thead-light pt-md-3">
                            <th scope="col">Topping</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col"></th>
                        </thead>
                        <tbody>
                            <tr v-for="orderedTopping in orderedToppings">
                                <td scope="row">{{ orderedTopping.topping }}</td>
                                <td scope="row">{{ orderedTopping.price }} €</td>
                                <td scope="row">{{ orderedTopping.quantity }}</td>
                                <td scope="row">
                                    <button type="button" class="btn btn-primary" v-on:click="addOrderedTopping(orderedTopping.topping,orderedTopping.quantity)">+</button>
                                    <button type="button" class="btn btn-secondary" v-on:click="removeOrderedTopping(orderedTopping.topping,orderedTopping.quantity)">-</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="form-group">
                    <label style="text-align:center;">
                        <h3>{{ pizzaPrice }}€</h3>
                    </label>
                </div>
                <div class="form-group form-inline">
                    <label for="deliveryTime">Delivery Time:</label>
                    <input class="form-control" type="time" v-model="deliveryTime" value="13:45:00">
                </div>
                <div class="form-group">
                    <button type="submit" id="orderNow" class="btn btn-success" v-on:click="addOrder();" disabled>Order Now!</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import OrdersService from '@/services/OrdersService'
    import ToppingService from '@/services/ToppingService'
    export default {
        name: 'OrderPizza',
        data() {
            return {
                toppings: [{}],

                first_name: '',
                last_name: '',
                adress: { city: '', zip: '', street: '', streetNmbr: '' },
                size: 0,
                orderedToppings: [],
                deliveryTime: '',
                pizzaPrice: 0,
                pizzaSicePrice: [{ option: "Small - 20cm", value: 3 }, { option: "Medium - 24cm", value: 4 }, { option: "Large - 27cm", value: 5.50 }, { option: "Family - 32cm", value: 7 }],
                selectedSize: '',

                toppingsArr: []
            }
        },
        watch: {
            selectedSize: function (val) {
                this.calcPrice(val)
            },
            deliveryTime: function (val) {
                this.deliveryTime = val
                this.checkform()
            }
        },
        mounted() {
            this.checkform()
            this.getToppings()
        },
        methods: {
            async getToppings() {
                const response = await ToppingService.fetchToppings()
                this.toppings = response.data.toppings
                for (var i = 0; i < this.toppings.length; i++) {
                    this.orderedToppings.push({ topping: this.toppings[i].topping, price: this.toppings[i].price, quantity: 0 })
                }
                console.log(this.toppings)
            },
            async addOrder() {
                this.setFinalToppings()
                await OrdersService.addOrder({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    adress: { city: this.adress.city, zip: this.adress.zip, street: this.adress.street, streetNmbr: this.adress.streetNmbr },
                    size: this.size,
                    orderedToppings: this.toppingsArr,
                    deliveryTime: this.deliveryTime,
                    price: this.pizzaPrice
                })
            },
            addOrderedTopping(topping, quantity) {
                if (quantity == 2) {
                    alert("Can not have more than 2 of one ingridient");
                } else {
                    for (var i = 0; i < this.orderedToppings.length; i++) {
                        if (this.orderedToppings[i].topping == topping) {
                            this.orderedToppings[i].quantity++
                            this.calcPrice(this.selectedSize)
                        }
                    }
                }
            },
            removeOrderedTopping(topping, quantity) {
                if (quantity == 0) {
                    return
                } else {
                    for (var i = 0; i < this.orderedToppings.length; i++) {
                        if (this.orderedToppings[i].topping == topping) {
                            this.orderedToppings[i].quantity--
                            this.calcPrice(this.selectedSize)
                        }
                    }
                }
            },
            calcPrice(selected) {
                var sizePrice;
                this.selectedSize = selected
                this.setSize(selected)
                switch (this.size) {
                    case 20:
                        sizePrice = 3
                        break;
                    case 24:
                        sizePrice = 4
                        break;
                    case 27:
                        sizePrice = 5.5
                        break;
                    case 32:
                        sizePrice = 7
                        break;
                }
                this.pizzaPrice = sizePrice
                for (var i = 0; i < this.orderedToppings.length; i++) {
                    if (this.orderedToppings[i].quantity > 0) {
                        this.pizzaPrice += this.orderedToppings[i].quantity * this.orderedToppings[i].price
                    }
                }
            },
            setSize(selected) {
                switch (selected) {
                    case 'Small - 20cm':
                        this.size = 20
                        break;
                    case 'Medium - 24cm':
                        this.size = 24
                        break;
                    case 'Large - 27cm':
                        this.size = 27
                        break;
                    case 'Family - 32cm':
                        this.size = 32
                        break;
                }
            },
            setFinalToppings() {
                this.toppingsArr
                for (var i = 0; i < this.orderedToppings.length; i++) {
                    if (this.orderedToppings[i].quantity > 0) {
                        if (this.orderedToppings[i].quantity == 2) {
                            this.toppingsArr.push(this.orderedToppings[i].topping)
                            this.toppingsArr.push(this.orderedToppings[i].topping)
                        } else {
                            this.toppingsArr.push(this.orderedToppings[i].topping)
                        }
                    }
                }
            },
            checkform() {
                var self = this
                setInterval(function () {
                    var f = document.getElementsByTagName('input');
                    var written = 0;

                    for (var i = 0; i < f.length; i++) {
                        if (f[i].value.length > 0) {
                            written++
                        }
                    }
                    if (written == f.length) {
                        document.getElementById('orderNow').disabled = false
                    }
                }, 1000)
            }
        }
    }

</script>

<style>
    #streetNumber {
        width: 50px;
        margin-left: 5px;
    }

    #zipInput {
        width: 75px;
        margin-left: 5px;
    }

    label {
        margin-right: 8px;
        margin-left: 10px;
        width: 150px;
    }

    .container {
        display: flex;
        justify-content: center;
    }

    th {
        color: black;
    }
</style>