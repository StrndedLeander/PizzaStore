import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import OrderPizza from '@/components/OrderPizza'

import Orders from '@/components/Management/Order/Orders'
import EditOrder from '@/components/Management/Order/EditOrder'
import Management from '@/components/Management/Management'
import Toppings from '@/components/Management/Topping/Toppings'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'OrderPizza',
      component: OrderPizza
    },
    {
      path: '/management',
      name: 'Management',
      component: Management,
    },
    {
      path: '/management/orders',
      name: 'Orders',
      component: Orders
    },
    {
      path: '/management/editorder',
      name: 'EditOrder',
      component: EditOrder
    },
    {
      path: '/management/toppings',
      name: 'Toppings',
      component: Toppings
    }
  ]
})
