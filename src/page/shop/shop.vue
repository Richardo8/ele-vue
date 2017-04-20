<template>
  <div v-loading.fullscreen.lock="isLoading" element-loading-text="拼命加载中">
    <section class="shop_container" v-if="!isLoading">
      <header ref="shopHeader" class="shop_detail_header" >
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
          <footer class="description_footer" v-if="shopDetailData.activities.length" @click="showActivitiesFun">
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
      <transition name="fade">
        <section class="activities_details" v-if="showActivities">
          <h2 class="activities_shoptitle">{{shopDetailData.name}}</h2>
          <h3 class="activities_ratingstar">
            <el-rate disabled v-model="shopDetailData.rating" text-color="#ff9900"></el-rate>
          </h3>
          <section class="activities_list">
            <header class="activities_title_style">
              <span>优惠信息</span>
            </header>
            <ul>
              <li v-for="item in shopDetailData.activities" :key="item.id">
                <span class="activites_icon" :style="{backgroundColor: '#' + item.icon_color, borderColor: '#' + item.icon_color}">
                  {{item.icon_name}}
                </span>
                <span>{{item.description}}(APP专享)</span>
              </li>
            </ul>
          </section>
          <section class="activities_shopinfo">
            <header class="activities_title_style"><span>商家公告</span></header>
            <p>{{promotionInfo}}</p>
          </section>
          <svg width="60" height="60" class="close_activities" @click.stop="showActivitiesFun">
            <circle cx="30" cy="30" r="25" stroke="#555" stroke-width="1" fill="none"/>
            <line x1="22" y1="38" x2="38" y2="22" style="stroke:#999;stroke-width:2"/>
            <line x1="22" y1="22" x2="38" y2="38" style="stroke:#999;stroke-width:2"/>
          </svg>
        </section>
      </transition>
      <section class="change_show_type" ref="chooseType">
        <div>
          <span :class="{activity_show: thisTab == 'food'}" @click="thisTab='food'">商品</span>
        </div>
        <div>
          <span :class="{activity_show: thisTab == 'rating'}" @click="thisTab='rating'">评价</span>
        </div>
      </section>
      <transition name="fade-choose">
        <section v-show="thisTab == 'food'" class="food_container">
          <section class="menu_container">
            <section class="menu_left" id="wrapper_menu">
              <ul>
                <li v-for="(item, index) in foodList" :key="index" class="menu_left_li" :class="{activity_menu: index == menuIndex}" @click="chooseMenu(index)">
                  <img :src="getPicUrl(item.icon_url)" v-if="item.icon_url">
                  <span>{{item.name}}</span>
                </li>
              </ul>
            </section>
            <section class="menu_right" ref="menuFoodList">
              <ul>
                <li v-for="(item, index) in foodList" :key="index">
                  <header class="menu_detail_header">
                    <section class="menu_detail_header_left">
                      <strong class="menu_item_title">{{item.name}}</strong>
                      <span class="menu_item_description">{{item.description}}</span>
                    </section>
                    <span class="menu_detail_header_right"></span>
                    <p v-if="index == TitleDetailIndex" class="description_tip">
                      <span>{{item.name}}</span>
                      {{item.description}}
                    </p>
                  </header>
                  <section v-for="(foods, foodIndex) in item.foods" :key="foodIndex" class="menu_detail_list">
                    <router-link to="{path: 'shop/foodDetail', query:{image_path:foods.image_path, description: foods.description, month_sales: foods.month_sales, name: foods.name, rating: foods.rating, rating_count: foods.rating_count, satisfy_rate: foods.satisfy_rate, foods, shopId}}" tag="div" class="menu_detail_link">
                      <section class="menu_food_img">
                        <img :src="getPicUrl(foods.image_path)">
                      </section>
                      <section class="menu_food_description">
                        <h3 class="food_description_head">
                          <strong class="description_foodname">{{foods.name}}</strong>
                          <ul v-if="foods.attributes.length" class="attributes_ul">
                            <li v-for="(attribute, foodindex) in foods.attributes" :key="foodindex" :style="{color: '#' + attribute.icon_color,borderColor:'#' +attribute.icon_color}" :class="{attribute_new: attribute.icon_name == '新'}">
                              <p :style="{color: attribute.icon_name == '新'? '#fff' : '#' + attribute.icon_color}">{{attribute.icon_name == '新'? '新品':attribute.icon_name}}</p>
                            </li>
                          </ul>
                        </h3>
                        <p class="food_description_content">{{foods.description}}</p>
                        <p class="food_description_sale_rating">
                          <span>月售{{foods.month_sales}}份</span>
                          <span>好评率{{foods.satisfy_rate}}份</span>
                        </p>
                        <p v-if="foods.activity" class="food_activity">
                          <span :style="{color: '#' + foods.activity.image_text_color,borderColor:'#' +foods.activity.icon_color}">{{foods.activity.image_text}}</span>
                        </p>
                      </section>
                    </router-link>
                  </section>
                </li>
              </ul>
            </section>
          </section>
        </section>
      </transition>
      <transition name="fade-choose">
        <section class="rating_container" id="ratingContainer" v-show="thisTab == 'rating'">
          <section v-loading.fullscreen.lock="isRatingLoading" element-loading-text="拼命加载中">
            <section>
              <header class="rating_header">
                <section class="rating_header_left">
                  <p>{{shopDetailData.rating}}</p>
                  <p>综合评价</p>
                  <p>高于周边商家{{(ratingScoresData.compare_rating*100).toFixed(1)}}%</p>
                </section>
                <section class="rating_header_right">
                  <p>
                    <span>服务态度</span>
                    <el-rate class="rating_class" disabled text-color="#ff9900" v-model="ratingScoresData.service_score"></el-rate>
                    <span class="rating_num">{{ratingScoresData.service_score.toFixed(1)}}</span>
                  </p>
                  <p>
                    <span>菜品评价</span>
                    <el-rate class="rating_class" disabled text-color="#ff9900" v-model="ratingScoresData.food_score"></el-rate>
                    <span class="rating_num">{{ratingScoresData.food_score.toFixed(1)}}</span>
                  </p>
                  <p>
                    <span>送达时间</span>
                    <span class="delivery_time">{{shopDetailData.order_lead_time}}分钟</span>
                  </p>
                </section>
              </header>
              <ul class="tag_list_ul">
                <li v-for="(item, index) in ratingTagsList" :key="index" :class="{unsatisfied: item.unsatisfied, tagActivity: ratingTagIndex == index}" @click="changeRatingTag(index, item.name)">{{item.name}}({{item.count}})</li>
              </ul>
              <ul class="rating_list_ul">
                <li v-for="(item, index) in ratingList" :key="index" class="rating_list_li">
                  <img :src="getPicUrl(item.avatar)" class="user_avatar">
                  <section class="rating_list_details">
                    <header>
                      <section class="username_star">
                        <p class="username">{{item.username}}</p>
                        <p class="star_desc">
                          <el-rate disabled text-color="#ff9900" v-model="item.rating_star"></el-rate>
                          <span class="time_spent_desc">{{item.time_spent_desc}}</span>
                        </p>
                      </section>
                      <time class="rated_at">{{item.rated_at}}</time>
                    </header>
                    <ul class="food_img_ul">
                      <li v-for="(item, index) in item.item_ratings" :key="index">
                        <img :src="getPicUrl(item.image_hash)" v-if="item.image_hash">
                      </li>
                    </ul>
                    <ul class="food_name_ul">
                      <li v-for="(item, index) in item.item_ratings" :key="index" class="ellipsis">
                        {{item.food_name}}
                      </li>
                    </ul>
                  </section>
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
import {msiteAdress, getShopDetails, getFoodList, getRatingList, getRatingScores, getRatingTagList} from '@/service/getData'
import BScroll from 'better-scroll'

export default {
    data(){
        return {
            geohash: '',
            shopId: null,
            shopDetailData: null,
            isLoading: true,
            isRatingLoading: false,
            thisTab: 'food',
            foodList: null,
            ratingList: null,
            menuIndex: 0,
            TitleDetailIndex: null,
            foodScroll: null,
            shopListTop: [],
            menuIndexChange: true,
            showActivities: false,
            ratingOffset: 0,
            ratingScoresData: null,
            ratingTagsList: null,
            ratingTagIndex: 0,
            ratingTagName: '',
            preventRepeatRequest: false,
            ratingScroll: null,
            wrapperMenu: null,
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
            this.ratingList = await getRatingList(this.shopId, this.ratingOffset);
            this.ratingScoresData = await getRatingScores(this.shopId);
            this.ratingTagsList = await getRatingTagList(this.shopId)
            this.isLoading = false;
        },
        getFoodListHeight(){
            const baseHeight = this.$refs.shopHeader.clientHeight;
            const chooseTypeHeight = this.$refs.chooseType.clientHeight;
            const listContainer = this.$refs.menuFoodList;
            const listArr = Array.from(listContainer.children[0].children);
            listArr.forEach((item, index) => {
                this.shopListTop[index] = item.offsetTop - baseHeight - chooseTypeHeight;
            })
            this.listenScroll(listContainer);
        },
        listenScroll(ele){
            this.foodScroll =new BScroll(ele, {
              probeType: 3,
              deceleration: 0.001,
              bounce: false,
              swipeTime: 2000,
              click: true,
            })

            this.wrapperMenu = new BScroll('#wrapper_menu', {
              click: true,
            })

            this.foodScroll.on('scroll', (pos) => {
              this.shopListTop.forEach((item, index) => {
                if(this.menuIndexChange && Math.abs(Math.round(pos.y)) >= item){
                  this.menuIndex = index;
                }
              })
//              let menuList = this.$refs.wrapperMenu.querySelectorAll('.activity_menu');
//              let el = menuList[0];
//              this.wrapperMenu.scrollToElement(el, 800);
            })
        },
        chooseMenu(index){
            this.menuIndex = index;
            this.menuIndexChang = false;
            this.foodScroll.scrollTo(0, -this.shopListTop[index], 400);
            this.foodScroll.on('scrollEnd', () => {
                this.menuIndexChange = true;
            })
        },
        showActivitiesFun(){
            this.showActivities = !this.showActivities;
        },
        async loadMoreRating(){
            if (this.preventRepeatRequest) {
              return
            }
            this.isRatingLoading = true;
            this.preventRepeatRequest = true;
            this.ratingOffset += 10;
            let ratingData = await getRatingList(this.shopId, this.ratingOffset, this.ratingTagName);
            this.ratingList = [...this.ratingList, ...ratingData];
            this.isRatingLoading = false;
            if(ratingData.length >= 10){
                this.preventRepeatRequest = false;
            }
        },
        async changeRatingTag(index, name){
            this.ratingTagIndex = index;
            this.ratingOffset = 0;
            this.ratingTagName = name;
            let data = await getRatingList(this.shopId, this.ratingOffset, name);
            this.ratingList = [...data];
            this.$nextTick(() => {
                this.ratingScroll.refresh();
            })
        }
    },
    watch: {
        isLoading: function (value) {
          if(!value){
            this.$nextTick(() => {
              this.getFoodListHeight();
            })
          }
        },
        thisTab: function (value) {
          if(value === 'rating'){
            this.$nextTick(() => {
              this.ratingScroll = new BScroll('#ratingContainer', {
                probeType: 3,
                deceleration: 0.003,
                bounce: false,
                swipeTime: 2000,
                click: true
              });
              this.ratingScroll.on('scroll', (pos) => {
                if(Math.abs(Math.round(pos.y)) >= Math.abs(Math.round(this.ratingScroll.maxScrollY))){
                    this.loadMoreRating();
                    this.ratingScroll.refresh();
                }
              })
            })
          }
        }
    },
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

  /*Fade*/
  .activities_details{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #262626;
    z-index: 200;
    padding: 1.25rem;
    .activities_shoptitle{
      text-align: center;
      @include sc(.8rem, #fff);
    }
    .activities_ratingstar{
      display: flex;
      justify-content: center;
      transform: scale(2.2);
      margin-top: .7rem;
    }
    .activities_list{
      margin-top: 1.5rem;
      margin-bottom: 1rem;
      @include sc(.5rem, #fff);
      li{
        margin-bottom: .2rem;
        .activities_icon{
          padding: 0 .02rem;
          display: inline-block;
          border: 0.025rem solid #fff;
          border-radius: 0.1rem;
        }
        span{
          color: #fff;
          line-height: .6rem;
        }
      }
    }
    .activities_shopinfo{
      p{
        line-height: .7rem;
        @include sc(.5rem, #fff);
      }
    }
    .activities_title_style{
      text-align: center;
      margin-bottom: 1rem;
      span{
        @include sc(.5rem, #fff);
        border: 0.025rem solid #555;
        padding: .2rem .4rem;
        border-radius: 0.5rem;
      }

    }
    .close_activities{
      position: absolute;
      bottom: 1rem;
      @include cl;
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
    .menu_right{
      flex: 4;
      overflow-y: auto;
      .menu_detail_header{
        width: 100%;
        padding: .4rem;
        position: relative;
        @include fj;
        align-items: center;
        .menu_detail_header_left{
          width: 11rem;
          white-space: nowrap;
          overflow: hidden;
          .menu_item_title{
            @include sc(0.7rem, #666);
            font-weight: bold;
          }
          .menu_item_description{
            @include sc(0.5rem, #999);
            width: 30%;
            overflow: hidden;
          }
        }
        .menu_detail_header_right{
          @include wh(.5rem, 1rem);
          display: block;
          @include bis('../../images/icon_point.png');
          background-size: 100% .4rem;
          background-position: left center;
        }
        .description_tip{
          background-color: #39373a;
          opacity: 0.95;
          @include sc(.5rem, #fff);
          position: absolute;
          top: 1.5rem;
          z-index: 14;
          width: 8rem;
          right: .2rem;
          padding: .5rem .4rem;
          border: 1px;
          border-radius: .2rem;
          span{
            color: #fff;
            line-height: .6rem;
            font-size: .55rem;
          }
        }
        .description_tip::after{
          content: '';
          position: absolute;
          @include wh(.4rem, .4rem);
          background-color: #39373a;
          top: -.5rem;
          right: .7rem;
          transform: rotate(-45deg) translateY(.41rem);
        }
      }
      .menu_detail_list{
        background-color: #fff;
        padding: .6rem .4rem;
        border-bottom: 1px solid #f8f8f8;
        position: relative;
        overflow: hidden;
        .menu_detail_link{
          display:flex;
          .menu_food_img{
            margin-right: .4rem;
            img{
              @include wh(2rem, 2rem);
              display: block;
            }
          }
          .menu_food_description{
            width: 100%;
            .food_description_head{
              @include fj;
              margin-bottom: .2rem;
              .description_foodname{
                @include sc(.7rem, #333);
              }
              .attributes_ul{
                display: flex;
                li{
                  font-size: .3rem;
                  height: .6rem;
                  line-height: .35rem;
                  padding: .1rem;
                  border: 1px solid #666;
                  border-radius: 0.3rem;
                  margin-right: .1rem;
                  transform: scale(.8);
                  p{
                    white-space: nowrap;
                    line-height: .4rem;
                  }
                }
                .attribute_new{
                  position: absolute;
                  top: 0;
                  left: 0;
                  background-color: #4cd964;
                  @include wh(2rem, 2rem);
                  display: flex;
                  align-items: flex-end;
                  transform: rotate(-45deg) translate(-.1rem, -1.5rem);
                  border: none;
                  border-radius: 0;
                  p{
                    @include sc(.4rem, #fff);
                    text-align: center;
                    flex: 1;
                  }
                }
              }
            }
            .food_description_content{
              @include sc(.5rem, #999);
              line-height: .6rem;
            }
            .food_description_sale_rating{
              line-height: .8rem;
              span{
                @include sc(.5rem, #333);
              }
            }
            .food_activity{
              line-height: .4rem;
              span{
                font-size: .3rem;
                border: 1px solid currentColor;
                border-radius: 0.3rem;
                padding: .08rem;
                display: inline-block;
                transform: scale(.8);
                margin-left: -0.35rem;

              }
            }
          }
        }
        .menu_detail_footer{
          margin-left: 2.4rem;
          font-size: 0;
          margin-top: .3rem;
          @include fj;
          .food_price{
            span{
              font-family: 'Helvetica Neue',Tahoma,Arial;
            }
            span:nth-of-type(1){
              @include sc(.5rem, #f60);
              margin-right: .05rem;
            }
            span:nth-of-type(2){
              @include sc(.7rem, #f60);
              font-weight: bold;
              margin-right: .3rem;
            }
            span:nth-of-type(3){
              @include sc(.5rem, #666);
            }
          }
        }
      }
    }
  }

  /*rating*/
  .rating_container{
    flex: 1;
    overflow-y: hidden;
    flex-direction: column;
    p, span, li, time{
      font-family: Helvetica Neue,Tahoma,Arial;
    }
    .rating_header{
      display: flex;
      background-color: #fff;
      padding: .8rem .5rem;
      margin-bottom: 0.5rem;
      .rating_header_left{
        flex: 3;
        text-align: center;
        p:nth-of-type(1){
          @include sc(1.2rem, #f60);
        }
        p:nth-of-type(2){
          @include sc(.65rem, #666);
          margin-bottom: .1rem;
        }
        p:nth-of-type(3){
          @include sc(.4rem, #999);
        }
      }
      .rating_header_right{
        flex: 4;
        p{
          font-size: .65rem;
          line-height: 1rem;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          span:nth-of-type(1){
            color: #666;
            margin-right: .5rem;
          }
          .rating_num{
            width: 3rem;
            @include sc(.55rem, #f60);
          }
          .delivery_time{
            @include sc(.4rem, #999);
          }
        }
      }
    }
    .tag_list_ul{
      display: flex;
      flex-wrap: wrap;
      background-color: #fff;
      padding: .5rem;
      li{
        @include sc(.6rem, #6d7885);
        padding: .3rem .3rem;
        background-color: #ebf5ff;
        border-radius: 0.2rem;
        border: 1px;
        margin: 0 .4rem .2rem 0;
      }
      .unsatisfied{
        background-color: #f5f5f5;
        color: #aaa;
      }
      .tagActivity{
        background-color: #3190e8;
        color: #fff;
      }
    }
    .rating_list_ul{
      background-color: #fff;
      padding: 0 .5rem;
      .rating_list_li{
        border-top: 1px solid #f1f1f1;
        display: flex;
        padding: .6rem 0;
        .user_avatar{
          @include wh(1.5rem, 1.5rem);
          border: 0.025rem;
          border-radius: 50%;
          margin-right: .8rem;
        }
        .rating_list_details{
          flex: 1;
          header{
            display: flex;
            flex: 1;
            justify-content: space-between;
            margin-bottom: .3rem;
            .username_star{
              @include sc(.55rem, #666);
              .username{
                color: #666;
                margin-bottom: .2rem;
              }
              .star_desc{
                display: flex;
                align-items: center;
                .time_spent_desc{
                  @include sc(.55rem, #666)
                  margin-left: .15rem;
                }
              }
            }
            .rated_at{
              @include sc(.4rem, #999);
            }
          }
          .food_img_ul{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: .4rem;
            li{
              img{
                @include wh(3rem, 3rem);
                margin-right: .4rem;
                display: block;
              }
            }
          }
          .food_name_ul{
            display: flex;
            flex-wrap: wrap;
            li{
              @include sc(.55rem, #999);
              width: 2.2rem;
              padding: .2rem;
              border: 0.025rem solid #ebebeb;
              border-radius: 0.15rem;
              margin-right: .3rem;
              margin-bottom: 4px;
            }
          }
        }
      }
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .fade-choose-enter-active, .fade-choose-leave-active {
    transition: opacity .5s;
  }
  .fade-choose-leave, .fade-choose-leave-active {
    display: none;
  }
  .fade-choose-enter, .fade-choose-leave-active {
    opacity: 0;
  }
</style>
