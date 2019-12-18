<template>
  <div class="carThree">
    <van-tabs v-model="active" swipeable :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky @change="change" title-active-color="#4771E6" title-inactive-color="#666">
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
  name: 'carThree',
  components:{

  },
  data () {
    return {
      // 订单选中
      active: 'a',
      // 订单状态
      orderList: [{
        name: '全部订单',
        id: 0
      },{
        name: '待付款',
        id: 1
      },{
        name: '接单中',
        id: 2
      }],
    }
  },
  methods:{
    // 改变选择
    change(a,b){
      console.log(a,b)
    }
  },
  mounted(){
    
  }
}
</script>

<style scoped lang="scss">
.carThree{
  height: 100%;
}
</style>