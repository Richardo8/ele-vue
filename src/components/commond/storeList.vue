<template>
  <div class="shopList_container">
    <ul>
      <li v-for="item in shopListArr" class="shop_li">
        <section>
          <img src="" class="shop_img">
        </section>
        <hgroup class="shop_right">
          <header class="shop_detail_header">
            <h4 class="shop_title">{{item.name}}</h4>
            <ul class="shop_detail_ul">
              <li v-for="item in item.supports" class="supports">
                {{item.icon_name}}
              </li>
            </ul>
          </header>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <el-rate disabled text-color="#ff9900" v-model="item.rating"></el-rate>
                <span class="rating_num">{{item.rating}}</span>
              </section>
              <section class="order_section">
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section class="rating_order_num_right" v-if="item.delivery_mode">
              <span class="delivery_style delivery_left">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <section class="fee">
              ￥{{item.float_minimum_order_amount}}起送
              <span class="segmentation">/</span>
              {{item.piecewise_agent_fee.tips}}
            </section>
            <section class="distance_time">
              <span>{{item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km' : item.distance + 'm'}}
                <span class="segmentation">/</span>
              </span>
              <span class="order_time">{{item.order_lead_time}}</span>
            </section>
          </h5>
        </hgroup>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getStoreList} from '@/service/getData'

  export default {
      data(){
          return {
            offset: 0,
            shopListArr:[]
          }
      },
      mounted(){
          this.initData()
      },
      methods:{
          async initData(){
              let res = await getStoreList('39.996369', '116.500778', this.offset);
              this.shopListArr = [...res]
          }
      }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .shopList_container{
    background-color: #fff;
    padding-bottom: 2rem;
  }
  .shop_li{
    display: flex;
    border-bottom: 0.025rem solid #f1f1f1;
    padding: 0.7rem 0.4rem;
  }
  .shop_img{
    @include wh(2.7rem, 2.7rem);
    display: block;
    margin-right: 0.4rem;
  }
  .shop_right{
    flex: auto;
    .shop_detail_header{
      @include fj;
      align-items: center;
      .shop_title{
        width: 8.5rem;
        color: #333;
        padding-top: 0.01rem;
        @include font(0.65rem, 0.65rem, 'PingFangSC-Regular');
        font-weight: 700;
      }
      .premium::before{
        content: '品牌';
        display: inline-block;
        font-size: 0.5rem;
        line-height: 0.6rem;
        background-color: #ffd930;
        padding: 0 0.1rem;
        border-radius: 0.1rem;
        margin-right: 0.2rem;
        vertical-align: top;
      }
      .shop_detail_ul{
        display: flex;
        .supports{
          @include sc(0.5rem, #999);
          border: 0.025rem solid #f1f1f1;
          padding: 0.04rem;
          border-radius: 0.08rem;
          margin-left: 0.05rem;
        }
      }
    }
    .rating_order_num{
      @include fj(space-between);
      height: 0.6rem;
      margin-top: 0.52rem;
      .rating_order_num_left{
        @include fj(flex-start);
        .rating_section{
          display: flex;
          .rating_num{
            @include sc(0.4rem, #ff6000);
            margin: 0 0.2rem;
          }
        }
        .order_section{
          @include sc(0.4rem, #666);
        }
      }
      .rating_order_num_right{
        display: flex;
        align-items: center;
        .delivery_style{
          font-size: 0.4rem;
          padding: 0.04rem 0.08rem 0;
          border-radius: 0.08rem;
          margin-left: 0.08rem;
          border: 1px;
        }
        .delivery_left{
          color: #fff;
          background-color: $blue;
          border: 0.025rem solid $blue;
        }
        .delivery_right{
          color: $blue;
          border: 0.025rem solid $blue;
        }
      }
    }
    .fee_distance{
      margin-top: 0.52rem;
      @include fj;
      @include sc(0.5rem, #666);
      .fee{
        @include sc(0.5rem, #666);
      }
      .distance_time{
        span{
          color: #999;
        }
        .order_time{
          color: $blue;
        }
        .segmentation{
          color: #ccc;
        }
      }
    }
  }
</style>
