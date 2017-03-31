<template>
  <div class="shop_list_container">
    <header class="shop_header">
      <svg class="shop_icon">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
      </svg>
      <span class="shop_header_title">附近商家</span>
    </header>
    <shop-list></shop-list>
  </div>
</template>

<script>
  import shopList from '@/components/commond/storeList';

  export default {
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
