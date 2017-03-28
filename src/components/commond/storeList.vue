<template>
  <div></div>
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
              console.log(res)
              this.shopListArr = [...res]
              console.log(this.shopListArr)
          }
      }
  }
</script>
