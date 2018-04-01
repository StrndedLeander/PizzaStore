<template>
    <div>
        <h1>Edit Post</h1>
        <div class="form">
            <div>
                <input type="text" name="title" placeholder="FIRST NAME" v-model="order.firstName">
            </div>
            <div>
                <textarea rows="15" cols="15" placeholder="LAST NAME" v-model="order.lastName"></textarea>
            </div>
            <div>
                <textarea rows="15" cols="15" placeholder="CITY" v-model="order.adress.city"></textarea>
                <textarea rows="15" cols="15" placeholder="STREET" v-model="order.adress.street"></textarea>
                <textarea rows="15" cols="15" placeholder="STREETNUMBER" v-model="order.adress.streetNmbr"></textarea>
            </div>
            <div>
                <textarea rows="15" cols="15" placeholder="SIZE" v-model="order.size"></textarea>
            </div>
            <div>
                <textarea rows="15" cols="15" placeholder="TOPPINGS" v-model="order.orderedToppings"></textarea>
            </div>
            <div>
                <textarea rows="15" cols="15" placeholder="HOUR" v-model="order.deliveryTime.hour"></textarea>
                <textarea rows="15" cols="15" placeholder="MINUTE" v-model="order.deliveryTime.minute"></textarea>
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
                order: { firstName: '', lastName: '', adress: { city: '', street: '', streetNmbr: '' }, size: 0, orderedToppings: [''], deliveryTime: { hour: 0, minute: 0 } }
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
                console.log(response.data)
                this.order.firstName = response.data.first_name
                this.order.lastName = response.data.last_name
                this.order.adress = response.data.adress
                this.order.size = response.data.size
                this.order.orderedToppings = response.data.orderedToppings
                this.order.deliveryTime = response.data.deliveryTime
            },
            async updateOrder() {
                await OrdersService.updateOrder({
                    id: this.$route.params.id,
                    first_name: this.order.firstName,
                    last_name: this.order.lastName,
                    adress: this.order.adress,
                    size: this.order.size,
                    orderedToppings: this.order.orderedToppings,
                    deliveryTime: this.order.deliveryTime
                })
                this.$router.push({ name: 'Orders' })
            }
        }
    }
</script>
<style>
</style>