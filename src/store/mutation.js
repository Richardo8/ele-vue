import {
  RECORD_ADDRESS
} from '@/store/mutation-type'

export default {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }){
    state.latitude = latitude;
    state.longitude = longitude;
  }
}
