// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import storeList from '@/components/commond/storeList'

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: storeList
    },
    {
      path: 'storelist',
      component: storeList
    },
    {
      path: '*',
      component: storeList
    }
  ]
})

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
