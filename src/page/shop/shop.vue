<template>

</template>

<script>
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
        this.shopId = this.$router.quesy.id;
    },
    mounted(){

    },
    methods: {
        async initData(){
            if(!this.latitued){
                let res = await msiteAdress(this.geohash)
            }
            this.shopDetailData = await getShopDetails(this.shopId)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
