<template>
    <div id="orders">
        <h1>All Orders</h1>
        <div v-if="orders.length > 0">
            <table>
                <tr>
                    <td>Name</td>
                    <td>Pizza</td>
                    <td>Deliver to:</td>
                    <td>Deliver at:</td>
                </tr>
                <tr v-for="order in orders">
                    <td>{{ order.first_name }} {{ order.last_name }}</td>
                    <td>{{ order.size }} cm {{ order.toppings }}</td>
                    <td>{{ order.adress.city }}, {{ order.adress.street }}{{ order.adress.streetNmbr }}</td>
                    <td>{{ order.deliveryTime.hour }}:{{ order.deliveryTime.minute }}</td>
                    <td align="center">
                        <router-link v-bind:to="{ name: 'EditOrder', params: { id: order._id } }">Edit</router-link> |
                        <a href="#" @click="deleteOrder(order._id)">Delete</a>
                    </td>
                </tr>
            </table>
        </div>
        <div v-else>
            <h2>There are no ordes at the moment</h2>
        </div>
    </div>
</template>

<script>
    import OrdersService from '@/services/OrdersService'
    import ToppingService from '@/services/ToppingService'
    export default {
        name: 'Orders',
        data() {
            return {
                orders: [],
                toppings: [],
                orderedToppings: []
            }
        },
        mounted() {
            this.getOrders()
            this.getToppings()
        },
        methods: {
            async getOrders() {
                const response = await OrdersService.fetchOrders()
                this.orders = response.data.orders
            },
            async getToppings() {
                const response = await ToppingService.fetchToppings()
                this.toppings = response.data.toppings
            }
        }
    }
</script>

<style>
</style>