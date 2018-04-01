<template>
    <div id="home">
        <h1>Pizza</h1>
        <button class="btn btn-primary">Cool</button>
        <form>
            First Name:<input type="text" v-model="first_name" required><br>
            Last Name:<input type="text" v-model="last_name" required><br>
            <form>
             <!--Choose your pizza -->   
            </form>
            City:<input type="text" v-model="adress.city" required><br>
            Street:<input type="text" v-model="adress.street" required>Housenumber:<input type="text" v-model="adress.streetNmbr" required><br>
            When do you want your pizza delivered:
            <input type="number" min="0" max="24" v-model="deliveryTime.hour" required>:
            <input type="number" min="0" max="60" v-model="deliveryTime.minute"><br>
            <input type="submit" value="Order now" v-on:click="addOrder">
        </form>
        
    </div>
</template>

<script>
    import OrdersService from '@/services/OrdersService'
    import ToppingService from '@/services/ToppingService'
    export default {
        name: 'OrderPizza',
        data() {
            return {
                toppings: [],
                first_name: '',
                last_name: '',
                adress:{city:'',street:'',streetNmbr:0},
                size: 25,
                orderedToppings: [],
                deliveryTime: {hour:0,minute:0}
            }
        },
        mounted() {
            this.getToppings()
        },
        methods: {
            async getToppings() {
                const response = await ToppingService.fetchToppings()
                this.toppings = response.data
            },
            async addOrder(){
                await OrdersService.addOrder({
                    first_name: this.first_name,
                    last_name: this.last_name,
                    adress:{city:this.adress.city,street:this.adress.street,streetNmbr:this.adress.streetNmbr},
                    size: this.size,
                    orderedToppings: this.orderedToppings,
                    deliveryTime:{hour: this.deliveryTime.hour, minute: this.deliveryTime.minute}
                })
            }
        }
    }
</script>

<style>
</style>