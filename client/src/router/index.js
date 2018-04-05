import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import Home from '@/components/Home'
import OrderPizza from '@/components/OrderPizza'

import EditOrder from '@/components/Management/Order/EditOrder'
import Management from '@/components/Management/Management'

Vue.use(BootstrapVue)
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
      path: '/management/editorder',
      name: 'EditOrder',
      component: EditOrder
    }
  ]
})
