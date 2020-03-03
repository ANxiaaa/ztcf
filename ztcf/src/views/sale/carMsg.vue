<template>
  <div class="carMsg">
    <div v-if="true">
      <img :src="carData.img" alt="" class="top">
      <div class="msg t600">
        <div class="container">
          <p class="price">特价: {{carData.showCost / 10000}}万<span>官方指导价: {{carData.price / 10000}}万</span></p>
          <p class="jianglv"><span>降率: {{((1 - (carData.showCost / carData.price)) * 100).toFixed(1)}}%</span><b @click="tocanshu(carData.carInfo)">详细参数</b></p>
          <p class="name">{{carData.name}}</p>
          <p class="time">活动时间: {{formatDate(carData.activityStartTime)}}-{{formatDate(carData.activityEndTime)}}</p>
        </div>
      </div>
      <div class="line"></div>
      <div class="det">
        <p class="lcTitle">
          <img :src="require('@/assets/insurance/liucheng.png')" alt="">
          <span class="t600">基本属性</span>
          <img :src="require('@/assets/insurance/liucheng.png')" alt="">
        </p>
        <ul class="container t600">
          <li>
            <p><span>库存:</span>{{carData.store}}</p>
            <div class="bd"></div>
          </li>
          <li v-for="i in carData.specialAttrs" :key="i.id">
            <p><span>{{i.key}}:</span>{{i.value}}</p>
            <p style="color: #999;">{{i.desc}}</p>
            <div class="bd"></div>
          </li>
        </ul>
        <div class="line"></div>
        <div class="preMsg">
          <p class="lcTitle">
            <img :src="require('@/assets/insurance/liucheng.png')" alt="">
            <span class="t600">服务介绍</span>
            <img :src="require('@/assets/insurance/liucheng.png')" alt="">
          </p>
          <div class="t600 specialDetail" v-html="carData.specialDetail.detail"></div>
        </div>
      </div>
      <div class="bottomBtn t600">
        <p>
          <img :src="require('@/assets/shoucang.png')" alt="">
          <span>收藏</span>
        </p>
        <p>
          <img :src="require('@/assets/dianhua.png')" alt="">
          <span>电话</span>
        </p>
        <btn @click="toxiadan(id)" name="线上下单"></btn>
      </div>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import { baseUrl } from '@/utils/global'
import { format } from '@/utils/date'
export default {
  name: 'carMsg',
  components:{
    btn
  },
  data () {
    return {
      carData: {
        specialDetail: {}
      }
    }
  },
  methods:{
    tocanshu(id){
      this.$router.push('/carParam?id=' + id)
    },
    // 下单
    toxiadan(productId){
      // let newOrder = {
      //   "createTime": "", // 订单创建时间
      //   "del": false, // 是否删除
      //   "id": 0, // 主键ID
      //   "logistics": { // 订单 - 物流信息实体
      //     "id": 0,
      //     "logisticsCompany": "", // 物流公司
      //     "logisticsNo": "", // 物流单号
      //     "memberId": user.id, // 会员id
      //     "orderId": 0, // 订单id
      //     "receiptId": 0, // 收货地址id
      //     "shipDate": "", // 发货时间
      //     "shipPeople": "" // 发货人
      //   },
      //   "memberDel": false, // 用户是否删除
      //   "memberId": user.id, // 会员ID
      //   "memberNickName": user.nickName, // 下单会员名称
      //   "memberPhone": user.phone, // 下单手机号
      //   "orderMoney": '', // 订单总额
      //   "orderName": carData.name, // 订单名称
      //   "orderNo": "", // 订单编号
      //   "orderPay": '', // 待支付金额
      //   "orderType": "nromal", // 订单类型
      //   "pay": { //	订单 - 支付信息实体
      //     "id": 0,
      //     "orderId": 0, // 订单id - 请求必选
      //     "payDate": "", // 支付时间
      //     "payMoney": '', // 支付金额
      //     "payNo": "", // 支付单号
      //     "payStatus": {
      //       "title": "string",
      //       "value": "string"
      //     },
      //     "payType": {
      //       "enable": true,
      //       "title": "string",
      //       "value": "string"
      //     },
      //     "refund": 0, // 是否退款
      //     "refundDate": "", // 退款时间
      //     "refundEndDate": "", // 退款到账时间
      //     "refundMoney": "", // 退款金额
      //     "refundNo": "", // 退款单号
      //     "refundReason": "", // 退款原因
      //     "refundStatus": {
      //       "title": "",
      //       "value": ""
      //     },
      //     "spbillCreateIp": "", // 用户终端IP - 请求必选
      //     "terminalType": {
      //       "title": "",
      //       "value": ""
      //     }
      //   },
      //   "products": [ // 订单商品信息
      //     {
      //       "id": 0,
      //       "orderId": 0, // 订单ID
      //       "product": {}, // 产品
      //       "productId": 0, // 商品ID
      //       "productType": "special_car", // 商品类型
      //       "quantity": 0, // 商品数量
      //       "totalPrice": '', // 总价
      //       "unitPrice": '' // 单价
      //     }
      //   ],
      //   "remark": "", // 备注
      //   "status": "pending" // 订单状态
      // }
      if(localStorage.isLogin){
        let param = {
          orderProductType: 'special_car',
          productId
        }
        this.$api.order.assemblyOrder(param).then(res => {
          if(res.code == 200){
            return res.data
          }else{
            this.Toast.fail(res.msg)
          }
        }).then(data => {
          if(!data)return;
          let user = this.userData
          let logistics = {
            "id": 0,
            "logisticsCompany": "", // 物流公司
            "logisticsNo": "", // 物流单号
            "memberId": user.id, // 会员id
            "orderId": 0, // 订单id
            "receiptId": 0, // 收货地址id
            "shipDate": "", // 发货时间
            "shipPeople": "" // 发货人
          }
          this.$api.user.getDefReceipt().then(res=>{
            if(res.data != null){
              logistics.receiptId = res.data.id || -1
            }
            data.logistics = logistics
            delete data.memberDel
            this.$store.commit('changeSaleOrder', data)
            this.$router.push('/addSaleOrder')
          })
        })
      }else{
        this.Dialog.confirm({
          title: '请登录',
          message: '您还未登录，确定要登录吗？'
        }).then(() => {
          this.$router.push('/register')
        })
      }
    },
    // 格式化时间
    formatDate(date){
      return format(date)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '车辆详情')
    this.$api.sale.findById(this.id).then(res=>{
      console.log(res.data.data)
      let carData = res.data.data
      carData.img = baseUrl + carData.img
      this.carData = carData
    })
    console.log(this.userData)
  },
  computed:{
    id(){
      return this.$route.query.id
    },
    // 用户信息
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    },
  }
}
</script>

<style scoped lang="scss">
.carMsg{
  background: #F2F4F7;
  overflow-y: auto;
  height: 100%;
  img.top{
    width: 7.413333rem;
    height: 3.893333rem;
    margin: 1.813333rem auto 0;
    display: block;
  }
}
.msg{
  width: 100%;
  margin: auto;
  margin-top: .8rem;
  border-radius:.8rem .8rem 0 0;
  background: #fff;
  padding: .533333rem .4rem;
  font-weight: 500;
  line-height: 1;
  div{
    .price{
      font-size:.48rem;
      color: #E55545;
      margin-bottom: .213333rem;
      span{
        margin-left: .466667rem;
        font-size:.373333rem;
        color:#999;
      }
    }
    .jianglv{
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        margin-left: .16rem;
        background: rgba($color: #175CE6, $alpha: .1);
        color: #175CE6;
        border-radius: .213333rem;
        padding: .05rem .2rem;
        text-align: center;
        font-size: .293333rem;
        line-height: .426667rem;
      }
      b{
        width: 1.813333rem;
        height: .64rem;
        border: .026667rem solid #999;
        font-size:.32rem;
        font-weight: 500;
        color: #999;
        border-radius: .32rem;
        line-height: .6rem;
        text-align: center;
      }
    }
    .name{
      font-size:.4rem;
      color: #333;
      margin-top: .15rem;
    }
    .time{
      margin-top: .2rem;
      font-size:.32rem;
      color: #E55545
    }
  }
}
.lcTitle{
  display: flex;
  justify-content: center;
  img{
    margin: .08rem 0;
    width: .453333rem;
    height: .253333rem;
  }
  span{
    font-size:.426667rem;
    margin: 0 .426667rem;
    line-height: 1;
    color: #EC8959;
  }
}
.det{
  background: #fff;
  padding-top: .533333rem;
  ul{
    padding-bottom: .6rem;
    margin-top: .266667rem;
    li{
      line-height: .96rem;
      .bd{
        margin: auto;
      }
      p{
        display: flex;
        font-weight: 500;
        color: #333;
        font-size: .373333rem;
        span{
          width: 3rem;
          color: #999;
        }
      }
    }
  }
}
.preMsg{
  background: #fff;
  padding-top: .533333rem;
  padding-bottom: 3.466667rem;
  .container{
    padding: 0 .466667rem;
    font-size: .373333rem;
    font-weight: 500;
    color: #666;
    line-height: .56rem;
    margin-top: .293333rem;
    text-indent: 2em;
  }
}
.bottomBtn{
  padding: .266667rem .4rem;
  position: fixed;
  background: #fff;
  left: 0;right: 0;bottom: 0;
  display: flex;
  align-items: center;
  p{
    margin-right: .5rem;
    text-align: center;
    font-weight: 500;
    font-size: .32rem;
    color: #8F9BB3;
    margin-top: .066667rem;
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
  }
}
.specialDetail{
  width: 10rem;
  margin: auto;
  padding: 0 .4rem !important;
  margin-top: .266667rem;
  overflow: hidden;
  p{
    text-indent: 0;
  }
}
</style>
<style scoped>
>>> .ql-align-center{
  text-align: center;
}
>>> .ql-align-right{
  text-align: right;
}
>>> .ql-align-justify{
  text-align: justify;
}
.specialDetail >>> img{
  width: 100%;
}
</style>