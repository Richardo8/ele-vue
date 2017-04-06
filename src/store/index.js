import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  latitude: '',
  longitude: '',
  geohash: '',
}

export default new Vuex.Store({
  state
})
