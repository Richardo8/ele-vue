<template>
  <div>
    <head-top>
      <div class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="9" cy="9" r="8" stroke="rgb(255,255,255)" stroke-width="2" fill="none"/>
          <line x1="15" y1="15" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </div>
      <div slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </div>
    </head-top>
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
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title ellipsis">附近商家</span>
      </header>
      <shop-list :geohash="geohash"></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
  import shopList from '@/components/commond/storeList';
  import {msiteAdress, getFoodTypes} from '@/service/getData';
  import {imgBaseUrl} from '@/config/commonparams/commonData';
  import headTop from '@/components/header/header';
  import footGuide from '@/components/footer/footer';
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
      mounted(){
        getFoodTypes(this.geohash).then(res => {
          let resLength = res.length;
          let resArr = res.concat([]);
          let foodArr = [];
          for(let i = 0, j = 0; i < resLength; i += 8, j++){
            foodArr[j] = resArr.splice(0, 8);
          }
          this.foodTypes = foodArr;
        }).then(() =>{
          new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            loop: true,
          })
        })
      },
      components: {
          headTop,
          shopList,
          footGuide,
      },
      methods: {

      }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .link_search{
    left: 0.8rem;
    @include wh(1.5rem, 1.5rem);
    @include ct;
  }
  .msite_title{
    @include center;
    width: 50%;
    color: #fff;
    text-align: center;
    .title_text{
      @include sc(0.8rem, #fff);
      text-align: center;
      display: block;
    }
  }
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
