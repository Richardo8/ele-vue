// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import routes from './router/index'

Vue.use(ElementUI);

Vue.config.productionTip = false

/* eslint-disable no-new */
const app = new Vue({
  router: routes,
  render: h => h(App)
}).$mount('#app')
