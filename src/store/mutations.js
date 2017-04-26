import {
  RECORD_ADDRESS,
  ADD_CART,
  REDUCE_CART,
  CLEAR_CART
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
    setStore('buyCart', state.cartList);
  },

  [REDUCE_CART](state, {
    shopId, category_id, item_id, food_id, name, price, specs
  }){
    let cart = state.cartList;
    let shop = (cart[shopId] || {});
    let category = (shop[category_id] || {});
    let item = (category[item_id] || {});
    if (item && item[food_id]) {
      if (item[food_id]['num'] > 0) {
        item[food_id]['num']--;
        state.cartList = {...cart};
        //存入localStorage
        setStore('buyCart', state.cartList);
      } else {
        //商品数量为0，则清空当前商品的信息
        item[food_id] = null;
      }
    }
  },

  [CLEAR_CART](state, shopId){
    state.cartList[shopId] = null;
    state.cartList = {...state.cartList};
    setStore('buyCart', state.cartList);
  }
}
