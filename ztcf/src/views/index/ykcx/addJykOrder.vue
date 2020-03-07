<template>
  <div class="addJykOrder">
    <div class="line"></div>
    <div class="goodsMsg">
      <h5>商品信息</h5>
      <div class="main">
        <div class="left">
          <img :src="baseUrl + orderInfo.product.img" alt="">
        </div>
        <div class="right">
          <div class="text">
            <p class="name">{{orderInfo.product.name}}</p>
            <p class="price">
              <b>¥{{Number(jiayouOrder.orderMoney)}}</b>
              <s>¥{{Number(jiayouOrder.orderPay)}}</s>
            </p>
          </div>
          <!-- <div v-for="(i, index) in orderInfo.product.specialAttrs" :key="'attr' + index" style="margin-top: .3rem" class="text">
            <p class="colorAttr">{{i.key}}</p>
            <b class="numAttr">{{i.value}}</b>
          </div> -->
          <span class="fuelcardNum" v-if="orderInfo.product.fuelcard">油卡号: {{orderInfo.product.fuelcard}}</span>
        </div>
      </div>
      <div class="line"></div>
      <p class="fwxy"><b>服务协议</b><van-icon name="arrow" size=".4rem" /></p>
      <!-- <p class="fwxy"><b>服务费</b><b>¥{{jiayouOrder.orderMoney}}</b></p> -->
      <div class="line"></div>
      <p class="pay"><b>应支付费用</b><b style="color: #D95A41">¥{{jiayouOrder.orderPay}}</b></p>
      <p class="field"><b>备注</b><textarea @input="input" v-model="jiayouOrder.remark" rows="1" placeholder="请在此输入相关要求"></textarea></p>
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
import { baseUrl } from '@/utils/global'
import { mapState } from 'vuex'
import btn from '@/components/input/btn'
export default {
  name: 'addJykOrder',
  components:{
    btn
  },
  data () {
    return {
      showPay: false,
      wxchecked: false,
      zfbchecked: false,
      baseUrl,
    }
  },
  methods:{
    // 监听输入框
    input(a){
      console.log(a.target.value)
      let data = {
        remark: a.target.value,
        pathFrom: 'jiayouOrder'
      }
      this.$store.commit('changeOrderBeizhu', data)
      a.target.style.height = a.target.scrollHeight + 'px'
    },
    // 提交订单
    subOrder(){
      // this.showPay = true
      let data = this.jiayouOrder
      data.logistics = {
        id: "",
        logisticsCompany: "",
        logisticsNo: "",
        memberId: "",
        orderId: "",
        receiptId: "",
        shipDate: "",
        shipPeople: "",
      }
      console.log(data)
      this.$api.order.submitOrder(data).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$router.push('/orderInfo?id=' + res.data.id)
        }else{
          this.Toast.fail(res.msg)
        }
      })
    },
    // 点击微信
    wxclick(){
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
  },
  computed:{
    // 订单信息
    jiayouOrder(){
      let data = this.$store.getters.jiayouOrder
      return Object.assign({}, data)
    },
    orderInfo(){
      let data = this.$store.getters.jiayouOrder
      return data.products[0]
    }
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
.fuelcardNum{
  font-size: .3rem;
  color: #999;
}
</style>