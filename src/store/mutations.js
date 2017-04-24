import {
  RECORD_ADDRESS,
  ADD_CART,
} from './mutation-type.js'

import {
  setStore,
  getStore,
} from '@/config/mutils'

export default {
  // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
  [RECORD_ADDRESS](state, {
    latitude,
    longitude
  }){
    state.latitude = latitude;
    state.longitude = longitude;
  },

  [ADD_CART](state, {
    shopId, category_id, item_id, food_id, name, price, specs, packing_fee, sku_id, stock
  }){
    let cart = state.cartList;
    let shop = cart[shopId] = (cart[shopId] || {});
    let category = shop[category_id] = (shop[category_id] || {});
    let item = category[item_id] = (category[item_id] || {});
    if(item[food_id]){
      item[food_id]['num']++;
    }else{
      item[food_id] = {
        'num': 1,
        'id': food_id,
        'name': name,
        'price': price,
        'specs': specs,
        'packing_fee': packing_fee,
        'sku_id': sku_id,
        'stock': stock
      }
    }
    state.cartList = {...cart};
    console.log(state.cartList)
    setStore('buyCart', state.cartList);
  }
}
