<template>
    <div id="management">
        <h1>Manage your Pizza store</h1>
        <div class="container">

            <table id="toppingTable" class="table table-bordered">
                <thead class="thead-dark pt-md-3">
                    <th scope="col">Topping</th>
                    <th scope="col">Price</th>
                </thead>
                <tbody>
                    <tr v-for="topping in toppings">
                        <td scope="row">{{ topping.topping }}</td>
                        <td scope="row">{{ topping.price }} €</td>
                    </tr>
                </tbody>
            </table>
            <form>
                <div class="form-group form-inline">
                    <label class="mr-1">Add new topping: </label>
                    <input type="text" v-model="newTopping" required>
                    <label class="mx-1">Price: </label>
                    <input required type="text" class="mr-1" v-model="newToppingPrice" style="width:40px;">€
                    <button type="submit" class="btn btn-success ml-1" v-on:click="addTopping">ADD</button>
                </div>
            </form>
            <table id="orderTable" class="table table-bordered">
                <thead class="thead-dark">
                    <th scope="col">Name</th>
                    <th scope="col">Adress</th>
                    <th scope="col">Pizza</th>
                    <th scope="col">Price</th>
                    <th scope="col">Deliver At:</th>
                    <th scope="col"></th>
                </thead>
                <tbody>
                    <tr v-for="order in orders">
                        <td scope="row">{{ order.first_name }} {{order.last_name }}</td>
                        <td scope="row">{{ order.adress.street }} {{order.adress.zip}} {{order.adress.streetNmbr}}, {{order.adress.city}}</td>
                        <td scope="row">{{ order.size }}cm Toppings: {{ order.orderedToppings }}</td>
                        <td scope="row">{{ order.price }}€</td>
                        <td scope="row">{{ order.deliveryTime }}</td>
                        <td scope="row">
                            <button class="btn btn-danger" v-on:click="deleteOrder(order._id)">
                                <img src="https://cdn3.iconfinder.com/data/icons/objects/512/Bin-512.png" style="width:15px;height:15px;">
                            </button>
                            <router-link :to="{name:'EditOrder', params: { id: order._id }}">Edit</router-link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    </div>
</template>

<script>
    import ToppingService from '@/services/ToppingService'
    import OrdersService from '@/services/OrdersService'

    export default {
        name: 'Management',
        data() {
            return {
                orders: [],
                toppings: [],
                newTopping: '',
                newToppingPrice: ''
            }
        },
        mounted() {
            this.getToppings()
            this.getOrders()
        },
        methods: {
            async getToppings() {
                const response = await ToppingService.fetchToppings()
                this.toppings = response.data.toppings
            },
            async getOrders() {
                const response = await OrdersService.fetchOrders()
                this.orders = response.data.orders
                this.orders = this.orders.reverse()
            },
            async deleteOrder(id) {
                const $this = this

                OrdersService.deleteOrder(id)
                $this.$router.go({
                    path: '/management'
                })
            },
            async addTopping() {
                await ToppingService.addTopping({
                    topping: this.newTopping,
                    price: this.newToppingPrice
                })
                $this.$router.go({
                    path: '/management'
                })
            }
        }
    }
</script>

<style>
</style>