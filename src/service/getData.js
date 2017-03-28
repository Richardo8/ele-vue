let montageURL = function (url, data) {
  let dataStr = ''; //数据拼接字符串
  Object.keys(data).forEach(key => {
    dataStr += key + '=' + data[key] + '&';
  })

  if (dataStr !== '') {
    dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
    url = url + '?' + dataStr;
  }

  return url;
}

async function dataJson(data) {
  let url = '/shopping/restaurants';
  let new_url  = montageURL(url, data)
  let res = await fetch(new_url);
  return await res.json();
}

let getStoreList = (latitude, longitude, offset, restaurant_category_id = '', restaurant_category_ids = '', order_by = '', delivery_mode = '', support_ids = []) => {
  let supportStr = '';
  support_ids.forEach(item => {
    if (item.status) {
      supportStr += '&support_ids[]=' + item.id;
    }
  });
  let data = {
    latitude,
    longitude,
    offset,
    limit: '20',
    'extras[]': 'activities',
    keyword: '',
    restaurant_category_id,
    'restaurant_category_ids[]': restaurant_category_ids,
    order_by,
    'delivery_mode[]': delivery_mode + supportStr
  };
  return dataJson(data)
};

export {getStoreList}
