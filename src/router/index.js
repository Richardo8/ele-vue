import Vue from 'vue'
import Router from 'vue-router'
import storeList from '@/components/commond/storeList'
import msite from '@/page/msite/msite'
import shop from '@/page/shop/shop'
import shopDetail from '@/page/shop/children/shopDetail'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/',
      component: msite
    },
    {
      path: 'msite',
      component: msite
    },
    {
      path: '/shop',
      component: shop,
      children: [{
        path: 'shopDetail',
        component: shopDetail,
      }]
    },
    {
      path: '*',
      component: msite
    }

  ]
})
