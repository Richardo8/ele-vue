<template>
  <div>
    <ul>
      <li v-for="item in shopListArr">
        <section>
          <img src="">
        </section>
        <hgroup>
          <header>
            <h4>{{item.name}}</h4>
            <ul>
              <li v-for="item in item.supports">
                {{item.icon_name}}
              </li>
            </ul>
          </header>
          <h5>
            <section>
              <section>
                <el-rate disabled text-color="#ff9900" v-model="item.rating"></el-rate>
                <span>{{item.rating}}</span>
              </section>
              <section>
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section v-if="item.delivery_mode">
              <span>{{item.delivery_mode.text}}</span>
              <span>准时达</span>
            </section>
          </h5>
          <h5>
            <section>
              ￥{{item.float_minimum_order_amount}}起送
              <span>/</span>
              {{item.piecewise_agent_fee.tips}}
            </section>
            <section>
              <span>{{item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km' : item.distance + 'm'}}
                <span>/</span>
              </span>
              <span>{{item.order_lead_time}}</span>
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
