<template>
  <div>
    <span class="title_text ellipsis">{{msiteTitle}}</span>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes">
            <a v-for="fooItem in item" class="link_to_food" v-if="foodItem.title !== '预定早餐'">
              <figure>
                <img :src="imgBaseUrl + fooItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </a>
          </div>
        </div>
      </div>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title ellipsis">附近商家</span>
      </header>
      <shop-list></shop-list>
    </div>
  </div>
</template>

<script>
  import shopList from '@/components/commond/storeList';
  import {msiteAdress, getFoodTypes} from '@/service/getData';
  import {imgBaseUrl} from '@/config/commonparams/commonData';

  export default {
      data(){
          return {
              geohash: 'wx4g6zgvbmc',
              msiteTitle: '',
              foodTypes: [],
              imgBaseUrl
          }
      },
      async beforeMount(){
          let res = await msiteAdress(this.geohash);
          this.msiteTitle = res.name;
      },
      async mounted(){
         let res = await getFoodTypes(this.geohash);
         this.foodTypes = [...res];
      },
      components: {
          shopList
      }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .shop_list_container{
    margin-top: 0.4rem;
    border-top: 0.025rem solid $bc;
    background-color: #fff;
    .shop_header{
      .shop_icon{
        fill: #999;
        margin-left: 0.6rem;
        vertical-align: middle;
        @include wh(0.6rem, 0.6rem);
      }
      .shop_header_title{
        color: #999;
        @include font(0.55rem, 1.6rem)
      }
    }
  }
</style>
