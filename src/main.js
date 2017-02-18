// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'

import goods from 'components/goods/goods'
import seller from 'components/seller/seller'
import ratings from 'components/ratings/ratings'
import 'common/stylus/index.styl'

/* eslint-disable no-new */
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/goods', component: goods},
    {path: '/seller', component: seller},
    {path: '/ratings', component: ratings}
  ],
  linkActiveClass:"active",
})

// router.push('/goods')

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
  // render: h => h(App), // render function
})
