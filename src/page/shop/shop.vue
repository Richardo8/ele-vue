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
          </router-link>
        </section>
      </header>
    </section>
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {getPicUrl} from '@/components/commond/mixins'
import {msiteAdress, getShopDetails} from '@/service/getData'

export default {
    data(){
        return {
            geohash: '',
            shopId: null,
            shopDetailData: null,
            isLoading: true
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
      ])
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
            this.shopDetailData = await getShopDetails(this.shopId, this.latitude, this.longitude)
            this.isLoading = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import 'src/style/mixin';

.shop_container{
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  left: 0;
  height: 100%;
}
</style>
