<template>
  <div v-loading.fullscreen.lock="isLoading" element-loading-text="拼命加载中">
    <section class="shop_container" v-if="!isLoading">
      <header class="shop_detail_header" >
        <img :src="getPicUrl(shopDetailData.image_path)" class="header_cover_img">
        <section class="description_header">
          <router-link to="/shop/shopDetail" class="description_top">
            <section class="description_left">
              <img :src="getPicUrl(shopDetailData.image_path)">
            </section>
            <section class="description_right">
              <h4 class="description_title ellipsis">{{shopDetailData.name}}</h4>
              <p class="description_text">商家配送/{{shopDetailData.order_lead_time}}分钟送达/配送费￥{{shopDetailData.float_delivery_fee}}</p>
              <p class="description_promotion ellipsis">公告：{{promotionInfo}}</p>
            </section>
            <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
              <path d="M0 0 L8 7 L0 14"  stroke="#fff" stroke-width="1" fill="none"/>
            </svg>
          </router-link>
          <footer class="description_footer" v-if="shopDetailData.activities.length">
            <p class="ellipsis">
              <span class="tip_icon" :style="{backgroundColor: '#' + shopDetailData.activities[0].icon_color, borderColor: '#' + shopDetailData.activities[0].icon_color}">{{shopDetailData.activities[0].icon_name}}</span>
              <span>{{shopDetailData.activities[0].description}}（APP专享）</span>
            </p>
            <p>{{shopDetailData.activities.length}}个活动</p>
            <svg class="footer_arrow">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-left"></use>
            </svg>
          </footer>
        </section>
      </header>
      <section class="change_show_type" >
        <div>
          <span :class="{activity_show: thisTab == 'food'}">商品</span>
        </div>
        <div>
          <span :class="{activity_show: thisTab == 'rating'}">评价</span>
        </div>
      </section>
      <transition name="fade-choose">
        <section v-show="thisTab == 'food'" class="food_container">
          <section class="menu_container">
            <section class="menu_left" id="wrapper_menu">
              <ul>
                <li v-for="(item, index) in foodList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}">
                  <img :src="getPicUrl(item.icon_url)" v-if="item.icon_url">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </transition>
    </section>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getPicUrl} from '@/components/commond/mixins'
import {msiteAdress, getShopDetails, getFoodList} from '@/service/getData'

export default {
    data(){
        return {
            geohash: '',
            shopId: null,
            shopDetailData: null,
            isLoading: true,
            thisTab: 'food',
            foodList: null,
            ratingList: null,
            menuIndex: 0
        }
    },
    created(){
        this.geohash = this.$route.query.geohash;
        this.shopId = this.$route.query.id;

    },
    mounted(){
        this.initData()
    },
    mixins: [getPicUrl],
    computed: {
      ...mapState([
          'latitude', 'longitude'
      ]),
      promotionInfo: function () {
        return this.shopDetailData.promotion_info || '欢迎光临，用餐高峰请提前下单，谢谢。'
      }
    },
    methods: {
        ...mapMutations([
            'RECORD_ADDRESS'
        ]),
        async initData(){
            if(!this.latitued){
                let res = await msiteAdress(this.geohash)
                this.RECORD_ADDRESS(res);
            }
            this.shopDetailData = await getShopDetails(this.shopId, this.latitude, this.longitude);
            this.foodList = await getFoodList(this.shopId);
            this.isLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';

  /*头部*/
  .shop_container{
    display: flex;
    flex-direction: column;
    position: absolute;
    right: 0;
    left: 0;
    height: 100%;
  }

  .shop_detail_header{
    overflow: hidden;
    position: relative;
    .header_cover_img{
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 9;
      filter: blur(10px);
    }
    .description_header{
      position: relative;
      z-index: 10;
      background-color: rgba(119, 103, 137, 0.43);
      padding: 0.4rem 0 0.4rem 0.4rem;
      width: 100%;
      overflow: hidden;
      .description_top{
        display: flex;
        .description_left{
          margin-right: 0.3rem;
          img{
            @include wh(2.9rem, 2.9rem);
            display: block;
            border-radius: 0.15rem;
          }
        }
        .description_right{
          flex: 1;
          .description_title{
            @include sc(0.8rem, #fff);
            font-weight: bold;
            width: 100%;
            margin-bottom: 0.3rem;
          }
          .description_text{
            @include sc(0.5rem, #fff);
            margin-bottom: 0.3rem;
          }
          .description_promotion{
            @include sc(0.5rem, #fff);
            width: 11.5rem;
          }
        }
        .description_arrow{
          @include ct;
          right: 0.3rem;
          z-index: 11;
        }
      }
      .description_footer{
        @include fj;
        margin-top: 0.5rem;
        padding-right: 1rem;
        p{
          @include sc(0.5rem, #fff);
          span{
            color: #fff;
          }
          .tip_icon{
            padding: 0 0.04rem;
            border: 0.025rem solid #fff;
            border-radius: 0.1rem;
            font-size: 0.4rem;
            display: inline-block;
          }
        }
        .ellipsis{
          width: 84%;
        }
        .footer_arrow{
          @include wh(0.4rem, 0.45rem);
          position: absolute;
          right: 0.3rem;
        }
      }
    }
  }

  /*Tab*/
  .change_show_type{
    display: flex;
    background-color: #fff;
    padding: 0.3rem 0 0.3rem;
    border-bottom: 1px solid #ebebeb;
    div{
      flex: 1;
      text-align: center;
      span{
        @include sc(0.65rem, #666);
        padding: 0.2rem 0.1rem;
        border-bottom: 0.12rem solid #fff;
      }
      .activity_show{
        color: #3190e8;
        border-color: #3190e8;
      }
    }
  }

  /*FoodList*/
  .food_container{
    display: flex;
    flex: 1;
    padding-bottom: 2rem;
  }
  .menu_container{
    display: flex;
    flex: 1;
    overflow-y: hidden;
    .menu_left{
      background-color: #f8f8f8;
      width: 3.8rem;
      .menu_left_li{
        padding: 0.7rem 0.3rem;
        border-bottom: 0.025rem solid #ededed;
        box-sizing: border-box;
        border-left: 0.15rem solid #f8f8f8;
        position: relative;
        img{
          @include wh(0.5rem, 0.6rem);
        }
        span{
          @include sc(0.6rem, #666);
        }
        .category_num{
          position: absolute;
          top: 0.1rem;
          right: 0.1rem;
          background-color: #ff461d;
          line-height: 0.6rem;
          text-align: center;
          border-radius: 50%;
          border: 0.025rem solid #ff461d;
          min-width: 0.6rem;
          height: 0.6rem;
          @include sc(0.5rem, #fff);
          font-family: Helvetica Neue, Tahoma, Arial;
        }
      }
      .activity_menu{
        border-left: 0.15rem solid #3190e8;
        background-color: #fff;
        span:nth-of-type(1){
          font-weight: bold;
        }
      }
    }
  }
</style>
