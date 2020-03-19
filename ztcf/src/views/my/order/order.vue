<template>
  <div class="order">
    <van-tabs style="height: 100%;overflow-y: auto;" v-model="active" swipeable :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky @change="changeOrder" title-active-color="#4771E6" title-inactive-color="#666">
      <!-- <div class="orderType">
        <p v-for="(i, index) in twoType" :class="{active: i.active}" :key="i.type" @click="twoTypeChange(i, index)">{{i.name}}</p>
      </div> -->
      <van-tab replace v-for="i in orderType" :key="i.name" :title="i.title" :name="i.value" :to="'/order?type=' + i.value">
        <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="load1">
          <order-list :orderType="orderType" :dataList="orderList" style="margin-top: .5rem"/>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import orderList from '@/components/list/orderList'
export default {
  name: 'order',
  components:{
    orderList
  },
  data () {
    return {
      active: 2,
      loading1: false,
      finished1: false,
      orderType: [],
      twoType: [{
        name: '特价车',
        type: 2,
        active: true
      },{
        name: '车险购买',
        type: 3,
        active: false
      },{
        name: '查询办理',
        type: 5,
        active: false
      },{
        name: '硬件采购',
        type: 's',
        active: false
      }],
      orderList: []
    }
  },
  methods:{
    // 订单状态变更
    changeOrder(a,b){
      this.findOrder(a)
    },
    // 订单类型变更
    twoTypeChange(index, item){
      if(index.active){
        this.twoType.forEach(i=>{
          i.active = false
        })
        this.twoType[0].active = true
        console.log(this.twoType[0].name)
      }else{
        this.twoType.forEach(i=>{
          i.active = false
        })
        this.twoType[item].active = true
        console.log(index.name)
      }
    },
    // 请求订单
    findOrder(){
      this.orderType.forEach(i => {
        if(this.active == i.value){
          this.$api.order.findOrderByStatus(i.name).then(res=>{
            this.orderList = res.data
          })
        }
      })
    },
    // 请求
    load1(){
      setTimeout(()=>{
        this.loading1 = false
        this.finished1 = true
      }, 0)
    },
  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
    this.active = this.$route.query.type || 1
    this.$api.order.getOrderStatusEnum().then(res=>{
      this.orderType = res.data
      this.findOrder()
    })
  }
}
</script>

<style scoped lang="scss">
.order{
  height: 100%;
}
.orderType{
  padding: .32rem .4rem;
  display: flex;
  p{
    width:1.92rem;
    height:.64rem;
    line-height:.62rem;
    border:.026667rem solid currentColor;
    border-radius:.32rem;
    color: #999;
    font-size: .32rem;
    text-align: center;
    margin-right: .213333rem;
  }
  .active{
    color: #4771E6;
  }
}
</style>
<style scoped>
>>> .van-tabs__content{
  height: calc(100% - 44px)
}
</style>