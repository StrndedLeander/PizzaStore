<template>
    <div>
        <h1>Edit Post</h1>
        <div class="form">
            <div>
                <textarea  rows="1" cols="25" placeholder="FIRST NAME" v-model="order.firstName"></textarea>
            </div>
            <div>
                <textarea rows="1" cols="25" placeholder="LAST NAME" v-model="order.lastName"></textarea>
            </div>
            <div>
                <textarea rows="1" cols="25" placeholder="CITY" v-model="order.adress.city"></textarea>
                <textarea rows="1" cols="35" placeholder="STREET" v-model="order.adress.street"></textarea>
                <textarea rows="1" cols="4" placeholder="HOUSENUMBER" v-model="order.adress.streetNmbr"></textarea>
            </div>
            <div>
                <textarea rows="1" cols="2" placeholder="SIZE" v-model="order.size"></textarea>
            </div>
            <div>
                <textarea rows="10" cols="25" placeholder="TOPPINGS" v-model="order.orderedToppings"></textarea>
            </div>
            <div>
                <textarea rows="1" cols="5" placeholder="PRICE" v-model="order.price">€</textarea>
                <label for="euroSign">€</label>
            </div>
            <div>
                <label for="deliveryTime">Delivery Time:</label>
                <textarea rows="1" cols="5" v-model="order.deliveryTime"></textarea>
            </div>
            <div>
                <button v-on:click="updateOrder">Update</button>
            </div>
        </div>
    </div>
</template>

<script>
    import OrdersService from '@/services/OrdersService'
    export default {
        name: 'EditPost',
        data() {
            return {
                order: { firstName: '', lastName: '', adress: { city: '', street: '', streetNmbr: '' }, size: '', orderedToppings: [''],price:'', deliveryTime: '' }
            }
        },
        mounted() {
            this.getOrder()
        },
        methods: {
            async getOrder() {
                const response = await OrdersService.getOrder({
                    id: this.$route.params.id
                })
                this.order.firstName = response.data.first_name
                this.order.lastName = response.data.last_name
                this.order.adress = response.data.adress
                this.order.size = response.data.size
                this.order.orderedToppings = response.data.orderedToppings
                this.order.deliveryTime = response.data.deliveryTime
                this.order.price = response.data.price
            },
            async updateOrder() {
                await OrdersService.updateOrder({
                    id: this.$route.params.id,
                    first_name: this.order.firstName,
                    last_name: this.order.lastName,
                    adress: this.order.adress,
                    size: this.order.size,
                    orderedToppings: this.order.orderedToppings,
                    deliveryTime: this.order.deliveryTime,
                    price: this.order.price
                })
                this.$router.push({ name: 'Management' })
            }
        }
    }
</script>
<style>
</style>