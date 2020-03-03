<template>
  <div class="addInsOrder">
    <div @click="address" class="addMsg">
      <h5>收货信息</h5>
      <div class="showadd" v-if="isAdd">
        <img :src="require('@/assets/my/order/showadd.png')" alt="">
        <div class="addname">
          <p><b>陈先生</b><span>19999999999</span></p>
          <p>河南省郑州市郑东新区商务外环28号某某大厦</p>
        </div>
        <van-icon name="arrow" size=".4rem" />
      </div>
      <div class="noadd" v-else>
        <img :src="require('@/assets/my/order/add3.png')" alt="">
        <p>暂无收货地址，点击添加地址</p>
      </div>
    </div>
    <div class="line"></div>
    <div class="goodsMsg">
      <h5>商品信息</h5>
      <div class="main">
        <img src="" alt="">
        <div>
          <p class="name"><span>太平洋保险公司</span><b>¥15000</b></p>
          <p class="carNum">豫ABZ639</p>
        </div>
      </div>
      <div class="line"></div>
      <p class="pay"><b>应支付费用</b><b style="color: #D95A41">¥560</b></p>
      <p class="field"><b>备注</b><textarea @input="input" rows="1" placeholder="请在此输入相关要求"></textarea></p>
    </div>
    <div class="line"></div>
    <div style="height: 3rem;"></div>
    <div class="bottom">
      <btn @click="subOrder" name="提交订单"></btn>
    </div>
    <van-popup v-model="showPay" closeable position="bottom">
      <div class="payBox">
        <h6>支付方式</h6>
        <div class="price">
          <b>¥<span>15200.00</span></b>
          <p>支付金额</p>
        </div>
        <ul class="selPay">
          <li @click="wxclick">
            <img :src="require('@/assets/my/order/wxpay.png')" alt="">
            <span>微信支付</span>
            <van-checkbox v-model="wxchecked"/>
          </li>
          <li @click="zfbclick">
            <img :src="require('@/assets/my/order/zfbpay.png')" alt="">
            <span>支付宝支付</span>
            <van-checkbox v-model="zfbchecked"/>
          </li>
        </ul>
        <div class="bottom">
          <btn name="确认支付"></btn>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'addInsOrder',
  components:{
    btn
  },
  data () {
    return {
      isAdd: false,
      showPay: false,
      wxchecked: false,
      zfbchecked: false,

    }
  },
  methods:{
    // 监听输入框
    input(a){
      a.target.style.height = a.target.scrollHeight + 'px'
    },
    // 提交订单
    subOrder(){
      this.showPay = true
    },
    // 点击微信
    wxclick(){
      console.log(1)
      this.wxchecked = !this.wxchecked
      this.zfbchecked = false
    },
    // 点击支付宝
    zfbclick(){
      this.zfbchecked = !this.zfbchecked
      this.wxchecked = false
    }
  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
  }
}
</script>

<style scoped lang="scss">
.addInsOrder{
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
  .noadd{
    height: 2.133333rem;
    background: #F9F9F9;
    border-radius: .133333rem;
    border: .026667rem dashed #E5E5E5;
    img{
      width: .666667rem;
      height: .666667rem;
      display: block;
      margin: .44rem auto 0;
    }
    p{
      text-align: center;
      font-size: .346667rem;
      color: #999;
      margin-top: .23rem;
    }
  }
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
  img{
    width: 2.133333rem;
    height: 2.133333rem;
    margin-right: .266667rem;
    background: #000;
  }
  div{
    flex: 1;
    .name{
      font-size: .373333rem;
      color:#666;
      display: flex;
      justify-content: space-between;
    }
    .carNum{
      font-size: .32rem;
      color: #999;
      margin-top: .2rem;
    }
  }
}
.field{
  display: flex;
  margin-top: .4rem;
  b{
    margin-right: .266667rem;
    font-size: .32rem;
  }
  textarea{
    flex: 1;
    border: none;
    resize: none
  }
}
.bottom{
  position: fixed;
  background: #fff;
  left: 0;right: 0;bottom: 0;
  padding: .266667rem 0;
}
.payBox{
  h6{
    font-size: .373333rem;
    color: #333;
    text-align: center;
    margin-top: .333333rem;
  }
  .price{
    text-align: center;
    margin-top: 1.2rem;
    b{
      color: #333;
      font-size: .32rem;
    }
    span{
      font-size: .64rem
    }
    p{
      font-size: .32rem;
      color: #999;
      margin-top: .1rem;
    }
  }
  .bottom{
    position: relative;
  }
  .selPay{
    margin-top: .4rem;
    padding: 0 .4rem;
    margin-bottom: 1.293333rem;
    li{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: .026667rem solid #F2F4F7;
      padding: .333333rem 0;
      img{
        width: .746667rem;
        height: .746667rem;
        margin-right: .333333rem;
      }
      span{
        flex: 1;
        font-size: .373333rem;
        color: #333;
      }
    }
  }
}
</style>