<template>
  <div class="collect">
    <van-tabs style="height: 100%;overflow-y: auto;" v-model="active" swipeable :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky @change="changeOrder" title-active-color="#4771E6" title-inactive-color="#666">
      <van-tab title="保险报价">
        <van-list v-model="loading1" :finished="finished1" finished-text="没有更多了" @load="load1">
          <ul class="collbx">
            <li>
              <img src="" alt="">
              <div>
                <p>太平洋保险太平洋保险</p>
                <span>先赔付再修车 最快25分钟太平洋保险太平洋保险</span>
              </div>
              <b>¥1200</b>
              <van-icon name="arrow" size=".4rem" />
            </li>
          </ul>
        </van-list>
      </van-tab>
      <van-tab title="特价车">
        <van-list v-model="loading2" :finished="finished2" finished-text="没有更多了" @load="load2">
          <leftpic></leftpic>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import orderList from '@/components/list/orderList'
import leftpic from '@/components/list/leftpic'
export default {
  name: 'collect',
  components:{
    orderList,
    leftpic
  },
  data () {
    return {
      active: 0,
      loading1: false,
      finished1: false,
      loading2: false,
      finished2: false,
      
    }
  },
  methods:{
    changeOrder(a,b){
      console.log(a,b)
    },
    // 请求全部保险订单
    load1(){
      this.loading1 = false
    },
    // 请求全部特价车订单
    load2(){
      this.loading2 = false
    }
  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
  }
}
</script>

<style scoped lang="scss">
.collect{
  height: 100%;
}
.collbx{
  li{
    padding: .426667rem .4rem;
    border-bottom: .026667rem solid #F2F4F7;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
      width: 1.066667rem;
      height: 1.066667rem;
      background: #000;
    }
    div{
      flex: 1;
      margin: 0 .333333rem;
      p{
        font-size: .426667rem;
        color: #333;
        font-weight: bold;
        line-height: .6rem;
      }
      span{
        font-size: .32rem;
        color: #999;
      }
    }
    b{
      color: #D95A41;
      font-size: .426667rem;
      margin-right: .2rem;
    }
  }
}
</style>
<style scoped>
>>> .van-tabs__content{
  height: calc(100% - 44px)
}
>>> .van-tab{
  flex: none;
  padding: 0 .4rem;
}
</style>