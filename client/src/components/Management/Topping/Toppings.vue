<template>
    <div id="orders">
        <h1>All current toppings on the menu:</h1>
        <ul id="toppingsList">
            <li v-for='topping in toppings'>
                <p>{{ topping.topping }}</p>
                <p> {{ topping.prices }}</p>
            </li>
        </ul>
        <form>
            Add new Topping:
            <br>
            <input v-model="newTopping" type="text" placeholder="Topping">
            <input v-on:click="addTopping" type="submit" value="Add to menu">
        </form>
    </div>
</template>

<script>
    import ToppingService from '@/services/ToppingService'
    export default {
        name: 'Toppings',
        data() {
            return {
                toppings: [],
                newTopping: ''
            }
        },
        mounted() {
            this.getToppings()
        },
        methods: {
            async getToppings() {
                const response = await ToppingService.fetchToppings()
                console.log(response)
                this.toppings = response.data.toppings
            },
            async addTopping() {
                console.log(newTopping)
                await ToppingService.addTopping({
                    topping: this.newTopping
                })
            }
        }
    }
</script>

<style>
</style>