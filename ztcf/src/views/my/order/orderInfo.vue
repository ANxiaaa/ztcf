<template>
  <div class="orderInfo">
    <div class="loading" v-if="loading">
      <van-loading color="#1989fa">加载中...</van-loading>
    </div>
    <div v-else>
      <div class="type">
        <img :src="orderType" alt="">
      </div>
      <div v-show="showAddress" class="addMsg">
        <h5>收货信息</h5>
        <div class="showadd">
          <img :src="require('@/assets/my/order/showadd.png')" alt="">
          <div class="addname">
            <p><b>{{address.name}}</b><span>{{address.phone}}</span></p>
            <p>{{address.address}}</p>
          </div>
        </div>
      </div>
      <div class="line"></div>
      <div class="goodsMsg">
        <h5>商品信息</h5>
        <div class="main">
          <div class="left">
            <img :src="baseUrl + carData.img" alt="">
          </div>
          <div class="right">
            <div class="text">
              <p class="name">{{showName}}</p>
              <p class="price">
                <b>¥{{showprice.youhui}}</b>
                <s>¥{{showprice.yuanjia}}</s>
              </p>
            </div>
            <div v-for="(i, index) in carData.specialAttrs" :key="'attr' + index" style="margin-top: .3rem" class="text">
              <p class="colorAttr">{{i.key}}</p>
              <b class="numAttr">{{i.value}}</b>
            </div>
            <span class="fuelcardNum" v-if="orderData.products[0].product.fuelcard">油卡号: {{orderData.products[0].product.fuelcard}}</span>
          </div>
        </div>
        <div class="line"></div>
        <p class="fwxy"><b>服务协议</b><van-icon name="arrow" size=".4rem" /></p>
        <p class="fwxy" v-show="showfuwu"><b>服务费</b><b>¥{{orderData.orderMoney}}</b></p>
        <div class="line"></div>
        <p class="pay"><b>应支付费用</b><b>¥{{orderData.orderPay}}</b></p>
      </div>
      <div class="line"></div>
      <div class="orderMsg">
        <h5>订单信息</h5>
        <p><b>订单编号：</b><span>{{orderData.orderNo}}</span></p>
        <p><b>创建时间：</b><span>{{timeFormat(orderData.createTime)}}</span></p>
        <!-- <p><b>支付方式：</b><span>支付宝</span></p> -->
        <!-- <p><b>支付时间：</b><span>2019-12-12 12:12:00</span></p> -->
      </div>
      <div class="line"></div>
      <div style="height: 3rem;"></div>
      <div class="bottom">
        <p @click="deleteOrder" v-show="orderData.status == 'pending'">取消订单</p>
        <p v-show="orderData.status != 'refund'">订单咨询</p>
        <p v-show="orderData.status == 'pending'" class="blue" @click="toPay">立即付款</p>
        <p v-show="orderData.status == 'ordering'" class="blue">申请退单</p>
        <p v-show="orderData.status == 'refund'">删除订单</p>
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
  </div>
</template>

<script>
import axios from 'axios'
import btn from '@/components/input/btn'
import { baseUrl } from '@/utils/global'
import { formatWithSeperator } from '@/utils/datetime'
export default {
  name: 'orderInfo',
  components:{
    btn
  },
  data () {
    return {
      orderType: require('@/assets/my/order/daifukuan.png'),
      showPay: false,
      wxchecked: false,
      zfbchecked: false,
      loading: true,
      orderData: {},
      address: {},
      carData: {},
      baseUrl
    }
  },
  methods:{
    toPay(){
      // this.$router.push('/orderPay')
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
    },
    // 格式化时间
    timeFormat(time){
      return formatWithSeperator(time, '-', ':')
    },
    deleteOrder(){
      this.Dialog.confirm({
        title: '取消订单',
        message: '确认要取消订单吗？'
      }).then(() => {
        this.$api.order.deleteOrder(this.$route.query.id).then(res=>{
          console.log(res)
          if(res.code == 200){
            this.Toast.success('取消成功')
          }else{
            this.Toast.fail(res.msg)
          }
        })
      })
    }
  },
  computed: {
    $$type(){
      return this.orderData.orderType
    },
    showAddress(){
      let show = true
      if(this.$$type == 'refueling_card'){
        show= false
      }
      return show
    },
    showprice(){
      let show = {}
      if(this.$$type == 'special_car' || this.$$type == 'nromal'){ // 特价车
        show.yuanjia = (Number(this.carData.price) / 10000).toFixed(2) + '万'
        show.youhui = (Number(this.carData.showCost) / 10000).toFixed(2) + '万'
      }else if(this.$$type == 'refueling_card'){
        show.yuanjia = this.orderData.orderMoney
        show.youhui = this.orderData.orderPay
      }
      console.log(show)
      return show
    },
    showfuwu(){
      let show = true
      if(this.$$type == 'refueling_card'){
        show = false
      }
      return show
    },
    showName(){
      let show = this.carData.name
      if(this.$$type == 'refueling_card'){
        show = this.orderData.orderName
      }
      return show
    },
  },
  mounted(){
    console.log('mounted')
    console.log(this.$route.query.id)
    this.$api.order.order(this.$route.query.id).then(res=>{
      if(res.code == 200){
        console.log(res)
        this.orderData = res.data
        console.log(this.$$type)
      }
    }).then(()=>{
      let $$type = this.$$type
      if($$type == "refueling_card"){ // 加油卡
        this.loading = false
      }else if($$type == 'special_car' || $$type == 'nromal'){ // 特价车
        axios.all([this.$api.user.getReceiptById(this.orderData.logistics.receiptId), this.$api.sale.findById(this.orderData.products[0].productId)]).then(res => {
          console.log(res)
          if(res[0].code != 200){
            this.Toast.fail('加载失败')
            return
          }
          if(res[1].code != 200){
            this.Toast.fail('加载失败')
            return
          }
          this.address = res[0].data
          this.carData = res[1].data.data
          this.loading = false
        })
      }
    })
    this.$store.commit('changeTitle','我的订单')
  }
}
</script>

<style scoped lang="scss">
.orderInfo{
  height: 100%;
  overflow-y: auto;
}
.loading{
  text-align: center;
  line-height: 3rem;
}
.type{
  height: 1.866667rem;
  background: rgba(71,113,230,.1);
  position: relative;
  img{
    position: absolute;
    top: 0;right: 0; bottom: 0;left: 0;
    margin: auto;
    width: 2.533333rem;
    // height: .533333rem
  }
}
.bottom{
  position: fixed;
  bottom: 0;
  left: 0;right: 0;
  background: #fff;
  padding: .333333rem .4rem;
  display: flex;
  justify-content: flex-end;
  p{
    width:2.24rem;
    height:.746667rem;
    border-radius: .373333rem;
    font-size: .373333rem;
    text-align: center;
    color: #999;
    line-height: .7rem;
    border:.026667rem solid currentColor;
    margin-left: .32rem;
  }
  .blue{
    color: #4771E6;
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