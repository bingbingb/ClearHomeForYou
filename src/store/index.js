import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
// 导入customer
import customer from './modules/customer'
import product from './modules/product.js'
import order from './modules/order.js'
import category from './modules/category.js'
import comment from './modules/comment.js'
import waiter from './modules/waiter.js'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    // customer模块
    customer,
    product, order, category, comment, waiter
  },
  getters
})

export default store
