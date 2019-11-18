<template>
  <div class="order">
    <van-tabs v-model="active" swipeable :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky @change="changeOrder" title-active-color="#4771E6" title-inactive-color="#666">
      <van-tab v-for="(i, index) in orderList" :title="i.name" :key="index">
        <ul>
          <li></li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'order',
  components:{

  },
  data () {
    return {
      active: 'a',
      orderList: [{
        name: '全部订单',
        id: 0
      },{
        name: '待付款',
        id: 1
      },{
        name: '接单中',
        id: 2
      },{
        name: '出单中',
        id: 3
      },{
        name: '已出单',
        id: 4
      },{
        name: '取消订单',
        id: 5
      }],
      
    }
  },
  methods:{
    changeOrder(a,b){
      console.log(a,b)
    }
  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
  }
}
</script>

<style scoped lang="scss">
.order{
  height: 100%;
}
</style>