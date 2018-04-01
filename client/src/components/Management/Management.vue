<template>
    <div id="management">
        <h1>Manage your Pizza store</h1>
        <router-link v-bind:to="{name:'Orders'}" tag="button">See and manage orders here!</router-link>
        <router-link :to="{name:'Toppings'}" tag="button">See and manage toppings here!</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Management'       
    }
</script>

<style>

</style>