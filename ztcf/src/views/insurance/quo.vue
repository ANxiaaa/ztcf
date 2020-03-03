<template>
  <div class="quo">
    <img class="pageBg" :src="require('@/assets/my/order/quoBg.png')" alt="">
    <div class="top">
      <h2>太平洋保险公司</h2>
      <p>
        <img :src="require('@/assets/my/order/leftl.png')" alt="">
        <span>您的车险报价神器</span>
        <img :src="require('@/assets/my/order/rightl.png')" alt="">
      </p>
    </div>
    <div class="basic">
      <h6>基本信息</h6>
      <div class="carmsg">
        <img src="" alt="">
        <div>
          <p>豫A88888</p>
          <span>奥迪A3系2019款 1.5L 豪华版</span>
        </div>
      </div>
      <p class="tbd">
        <b>投保地</b>
        <span>河南郑州</span>
      </p>
    </div>
    <div class="lianjie">
      <img :src="require('@/assets/my/order/lianjie.png')" alt="">
      <img :src="require('@/assets/my/order/lianjie.png')" alt="">
    </div>
    <div class="part">
      <h6>报价详情</h6>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p>
        <b>交强险</b>
        <b>1200</b>
      </p>
      <p class="heji">
        <b>合计</b>
        <b>1200</b>
      </p>
    </div>
    <div style="height: 3rem"></div>
    <div class="bottomBtn t600">
      <p>
        <img :src="require('@/assets/my/order/sc.png')" alt="">
        <span>收藏</span>
      </p>
      <p>
        <img :src="require('@/assets/my/order/dh.png')" alt="">
        <span>电话</span>
      </p>
      <btn name="线上下单"></btn>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'collect',
  components:{
    btn
  },
  data () {
    return {
    }
  },
  methods:{
  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
  }
}
</script>

<style scoped lang="scss">
.quo{
  overflow-y: auto;
  height: 100%;
  background: #3f6eee;
  .pageBg{
    position: absolute;
    top: 0;left: 0;
    width: 100%;
    height: 5.733333rem;
    z-index: 0;
  }
}
.top{
  z-index: 8;
  position: relative;
  color: #fff;
  text-align: center;
  padding-top: .8rem;
  padding-bottom: .533333rem;
  h2{
    font-size: .746667rem;
    font-weight: 500;
  }
  p{
    display: flex;
    justify-content: center;
    font-size: .293333rem;
    align-items: center;
    margin-top: .266667rem;
    img{
      width: .573333rem;
    }
    span{
      font-size: .293333rem;
      margin: 0 .333333rem;
    }
  }
}
h6{
  font-size: .426667rem;
  color: #F1AA2F;
  font-weight: bold;
  position: relative;
  display: inline;
  &:after{
    content: '';
    position: absolute;
    left: 0;right: 0;
    height: .16rem;
    background: rgba(241,170,47,.3);
    bottom: -.026667rem;
  }
}
.basic{
  padding: .4rem .533333rem;
  background: #fff;
  z-index: 8;
  width: 9.333333rem;
  margin: auto;
  position: relative;
  border-radius: .266667rem;
  .tbd{
    display: flex;
    justify-content: space-between;
    font-size: .373333rem;
    color: #999;
    padding: .333333rem 0;
    b{
      color: #333;
    }
  }
  .carmsg{
    display: flex;
    justify-content: space-between;
    border-bottom: .026667rem solid #F2F4F7;
    padding: .533333rem 0;
    align-items: center;
    img{
      width: 2.48rem;
      height: 1.293333rem;
      background: #000;
      margin-right: .346667rem;
    }
    div{
      flex: 1;
      font-size: .373333rem;
      color: #999;
      p{
        color: #333;
        margin-bottom: .166667rem;
      }
    }
  }
}
.lianjie{
  width: 8rem;
  height: .106667rem;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  z-index: 10;
  img{
    width: .16rem;
  }
}
.part{
  padding: .4rem .533333rem;
  background: #fff;
  z-index: 8;
  width: 9.333333rem;
  margin: auto;
  position: relative;
  border-radius: .266667rem;
  p{
    display: flex;
    justify-content: space-between;
    font-size: .373333rem;
    color: #333;
    font-weight: 600;
    margin-top: .4rem;
  }
  .heji{
    color: #D95A41;
  }
}
.bottomBtn{
  padding: .266667rem .4rem;
  position: fixed;
  background: #3f6eee;
  left: 0;right: 0;bottom: 0;
  display: flex;
  align-items: center;
  z-index: 11;
  p{
    margin-right: .4rem;
    text-align: center;
    font-weight: 500;
    font-size: .32rem;
    color: #fff;
    img{
      width: .48rem;
      height: .48rem;
      display: block;
      margin: auto;
      margin-bottom: .066667rem;
    }
  }
  button{
    flex: 1;
    background: #fff;
    color: #4771E6;
  }
}
</style>
<style scoped>
</style>