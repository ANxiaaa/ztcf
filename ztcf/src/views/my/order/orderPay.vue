<template>
  <div class="orderPay">
    <div v-if="payType !== null" class="type">
      <div class="payType">
        <img :src="payType?paysucc:payerr" alt="">
        <div>
          <h4>订单支付{{payType?'成功':'失败'}}</h4>
          <p v-if="payType">返回首页</p>
          <p v-else>重新支付</p>
        </div>
      </div>
    </div>
    <div class="addMsg">
      <h5>收货信息</h5>
      <div class="showadd" @click="$router.replace('/addressList')">
        <img :src="require('@/assets/my/order/showadd.png')" alt="">
        <div class="addname">
          <p><b>陈先生</b><span>19999999999</span></p>
          <p>河南省郑州市郑东新区商务外环28号某某大厦</p>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="goodsMsg">
      <h5>商品信息</h5>
      <div class="main">
        <div class="left">
          <img src="" alt="">
        </div>
        <div class="right">
          <div class="text">
            <p class="name">奥迪A3系 2019款 1.5LTSFI豪华版</p>
            <p class="price">
              <b>¥4300万</b>
              <s>¥20万</s>
            </p>
          </div>
          <div style="margin-top: .3rem" class="text">
            <p class="colorAttr">白</p>
            <b class="numAttr">X1</b>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <p class="fwxy"><b>服务协议</b><van-icon name="arrow" size=".4rem" /></p>
      <p class="fwxy"><b>服务费</b><b>¥560</b></p>
      <div class="line"></div>
      <p class="pay"><b>应支付费用</b><b>¥560</b></p>
    </div>
    <div class="line"></div>
    <div class="orderMsg">
      <h5>订单信息</h5>
      <p><b>订单编号：</b><span>ztkj121212121212</span></p>
      <p><b>支付方式：</b><span>支付宝</span></p>
      <p><b>支付时间：</b><span>2019-12-12 12:12:00</span></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderInfo',
  components:{
  },
  data () {
    return {
      payType: null,
      paysucc: require('@/assets/my/order/paysucc.png'),
      payerr: require('@/assets/my/order/payerr.png')
    }
  },
  methods:{
    
  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
    this.payType = true
  }
}
</script>

<style scoped lang="scss">
.orderPay{
  height: 100%;
  overflow-y: auto;
}
.type{
  height: 3.2rem;
  background: rgba(71,113,230,1);
  position: relative;
  .payType{
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    margin: auto;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      width: 2.4rem;
      height: 2.4rem;
      margin-right: .266667rem;
    }
    h4{
      font-size: .533333rem;
      color: #fff;
      margin-bottom: .4rem;
      font-weight: 500;
    }
    p{
      width:1.973333rem;
      height:.64rem;
      border:.026667rem solid currentColor;
      border-radius:.32rem;
      color: #fff;
      font-size: .32rem;
      line-height: .6rem;
      text-align: center;
    }
  }
}
h5{
  font-weight: bold;
  font-size: .426667rem;
  color: #333;
  margin-bottom: .4rem;
}
.addMsg{
  padding: .4rem;
  .showadd{
    display: flex;
    align-items: center;
    img{
      width: 1.08rem;
      height: 1.08rem;
      margin-right: .266667rem;
    }
    .addname{
      color: #333;
      font-size: .373333rem;
      b{
        margin-right: .533333rem;
      }
    }
  }
}
.goodsMsg{
  padding: .4rem;
  .line{
    height: .026667rem;
    margin: .4rem 0;
  }
  .fwxy{
    font-size: .373333rem;
    color: #666;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: .7rem;
  }
  .pay{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: .373333rem;
    color: #333;
  }
}
.orderMsg{
  padding: .4rem;
  p{
    font-size: .373333rem;
    color: #333;
    line-height: .7rem;
    b{
      color: #999
    }
  }
}
.main{
  display: flex;
  justify-content: space-between;
  .left{
    width: 2.4rem;
    margin-right: .2rem;
    img{
      width: 2.4rem;
      height: 1.8rem;
      display: block;
      background: #000;
    }
  }
  .right{
    flex: 1;
    .text{
      display: flex;
      justify-content: space-between;
      .name{
        line-height: .533333rem;
        flex: 1;
        font-size: .373333rem;
        height: 1rem;
        color: #666666;
        overflow: hidden;
      }
      .price{
        line-height: .533333rem;
        // width: 1.4rem;
        margin-left: .4rem;
        color: #666666;
        text-align: right;
        font-size: .32rem;
        s{
          font-size: .293333rem;
          color: #999;
          display: block;
        }
      }
      .colorAttr{
        color: #999;
        font-size: .32rem;
      }
      .numAttr{
        color: #999;
        font-size: .32rem; 
      }
    }
  }
}
</style>