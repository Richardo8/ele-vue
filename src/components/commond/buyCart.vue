<template>
  <section class="cart_module">
    <section v-if="!foods.specifications.length" class="cart_button">
      <transition name="showReduce">
        <span v-if="foodNum">
          <svg>
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
          </svg>
        </span>
      </transition>
      <transition name="fade">
        <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
      </transition>
      <svg class="add_icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-add"></use>
      </svg>
    </section>
    <section v-else class="choose_specification">
      <section class="choose_icon_container">
        <transition name="showReduce">
          <svg class="specs_reduce_icon" v-if="foodNum">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#cart-minus"></use>
          </svg>
        </transition>
        <transition name="fade">
          <span class="cart_num" v-if="foodNum">{{foodNum}}</span>
        </transition>
        <span class="show_chooselist">选规格</span>
      </section>
    </section>
  </section>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  export default{
      data(){
          return {
              showMoveDot: [],
          }
      },
      mounted(){

      },
      computed(){

      },
      props: ['foods', 'shopId'],
      methods: {

      }
  }
</script>

<style lang="scss" scoped>
  @import 'src/style/mixin';
  .cart_module{
    .add_icon{
      position: relative;
      z-index: 999;
    }
    .cart_button{
      display: flex;
      align-items: center;
    }
    svg{
      @include wh(.9rem, .9rem);
      fill: #3190e8;
    }
    .specs_reduce_icon{
      fill: #999;
    }
    .cart_num{
      @include sc(.65rem, #666);
      min-width: 1rem;
      text-align: center;
      font-family: Helvetica Neue,Tahoma;
    }
    .choose_specification{
      .choose_icon_container{
        display: flex;
        align-items: center;
        .show_chooselist{
          display: block;
          @include sc(.55rem, #fff);
          padding: .1rem .2rem;
          background-color: $blue;
          border-radius: 0.2rem;
          border: 1px solid $blue;
        }
      }
    }
  }
  .showReduce-enter-active, .showReduce-leave-active {
    transition: all .3s ease-out;
  }
  .showReduce-enter, .showReduce-leave-active {
    opacity: 0;
    transform: translateX(1rem);
  }
  .fade-enter-active, .fade-leave-active {
    transition: all .3s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }
  .fadeBounce-enter-active, .fadeBounce-leave-active {
    transition: all .3s;
  }
  .fadeBounce-enter, .fadeBounce-leave-active {
    opacity: 0;
    transform: scale(.7);
  }
</style>
