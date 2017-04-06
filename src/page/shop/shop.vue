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
        this.geohash = this.$router.query.geohash;
        this.shopId = this.$router.query.id;

    },
    mounted(){
        this.initData()
    },
    methods: {
        ...mapMutations([
            'RECORD_ADDRESS'
        ]),
        async initData(){
            if(!this.latitued){
                let res = await msiteAdress(this.geohash)
                console.log(res);
                this.RECORD_ADDRESS(res);
            }
            this.shopDetailData = await getShopDetails(this.shopId)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
