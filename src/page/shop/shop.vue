<template>
  <div>
    123
  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import {msiteAdress, getShopDetails} from '@/service/getData'

export default {
    data(){
        return {
            geohash: '',
            shopId: null,
            shopDetailData: null
        }
    },
    created(){
        this.geohash = this.$route.query.geohash;
        this.shopId = this.$route.query.id;

    },
    mounted(){
        this.initData()
    },
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
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
