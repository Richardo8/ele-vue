import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import storeList from '@/components/commond/storeList'


Vue.use(Router)

export default new Router({
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
