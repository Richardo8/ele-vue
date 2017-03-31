<template>
  <div>
    <span class="title_text ellipsis">{{msiteTitle}}</span>
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide food_types_container" v-for="(item, index) in foodTypes" :key="index">
            <a v-for="foodItem in item" class="link_to_food" :key="foodItem.id" v-if="foodItem.title !== '预定早餐'">
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </a>
            <a href="https://zaocan.ele.me/" class="link_to_food" v-else>
              <figure>
                <img :src="imgBaseUrl + foodItem.image_url">
                <figcaption>{{foodItem.title}}</figcaption>
              </figure>
            </a>
          </div>
          <div class="swiper-pagination"></div>
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
  import '@/plugins/swiper.min.js';
  import '@/plugins/swiper.min.css';

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
         let resLength = res.length;
         let resArr = res.concat([]);
         let foodArr = [];
         for(let i = 0, j = 0; i < resLength; i += 8, j++){
             foodArr[j] = resArr.splice(0, 8);
         }
         this.foodTypes = foodArr;
         let myswiper = new Swiper('.swiper-container', {
           pagination: '.swiper-pagination',
           loop: true
         })
      },
      components: {
          shopList
      }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .msite_nav{
    padding-top: 2.1rem;
    background-color: #fff;
    border-bottom: 0.025rem solid $bc;
    .swiper-container{
      @include wh(100%, auto);
      padding-bottom: 0.6rem;
      .swiper-pagination{
        bottom: 0.2rem;
      }
    }
  }
  .food_types_container{
    display: flex;
    flex-wrap: wrap;
    .link_to_food{
      width: 25%;
      padding: 0.3rem 0;
      @include fj(center);
      figure{
        img{
          margin-bottom: 0.3rem;
          @include wh(1.8rem, 1.8rem);
        }
        figcaption{
          text-align: center;
          @include sc(0.55rem, #666);
        }
      }
    }
  }
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
