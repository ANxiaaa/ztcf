<template>
  <div class="vague">
    <div class="pagebg">
      <img :src="require('@/assets/insurance/vagueBg.png')" alt="">
    </div>
    <div class="carBox container shadow t600">
      <div class="carInfo">
        <img :src="require('@/assets/sale/goods.png')" alt="">
        <div>
          <b>{{insuranceData.lsprefix + insuranceData.lsnum}}</b>
          <p>{{insuranceData.carName}}</p>
        </div>
      </div>
      <div class="bd"></div>
      <div class="add">
        投保地
        <b>{{insuranceData.province + insuranceData.city}}</b>
      </div>
    </div>
    <div class="scheme container shadow t600">
      <div class="title">
        <p>保险方案<b @click="toInsureType">修改 <van-icon name="arrow" size=".3rem" color="#b3b3b3"/></b></p>
        <span>当前为基础报价方案，可修改报价方案进行精确报价。</span>
      </div>
      <ul>
        <li v-for="(i, index) in insuranceData.offer.categorys" :key="index">
          {{i.category}}
          <b>{{i.unitPrice}}</b>
        </li>
      </ul>
    </div>
    <div class="baojia container shadow t600">
      <div class="title">
        <p>模糊报价<b>¥{{insuranceData.offer.totalPrice}}</b></p>
        <span>当前为基础报价方案，点击精确报价可获得精准报价方案。</span>
      </div>
    </div>
    <div style="height: 2rem"></div>
    <div class="fixBox">
      <btn @click="toExact" name="精准报价"></btn>
    </div>
    <van-popup :close-on-click-overlay="false" round v-model="improvement">
      <div class="pp t600">
        <img :src="require('@/assets/insurance/pp.png')" alt="">
        <p class="p1">完善信息</p>
        <p class="p2">获取多种保险方案报价</p>
        <p class="p2">请填写您的手机号</p>
        <p class="p4">
          <van-field maxlength="11" type="tel" input-align="center" v-model="menmberPhone" placeholder="请输入您的手机号" />
        </p>
        <button @touchstart="down" @click="aPhone" @touchend="up">立即完善</button>
        <p class="p3" @click="noBack">暂不完善</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import btn from '@/components/input/btn'
export default {
  name: 'vague',
  components:{
    btn
  },
  data () {
    return {
      improvement: false,
      subData: {},
      menmberPhone: ''
    }
  },
  methods:{
    aPhone(){
      if(!/^1[3456789]\d{9}$/.test(this.menmberPhone)){
        this.Toast.fail('请输入正确的手机号')
        return
      }
      this.subData.memberPhone = this.menmberPhone
      this.$store.commit('changeInsuranceSubData', this.subData)
      this.noBack()
    },
    // 更改车型
    changeCar(){
      this.$router.push('/insureAddCar?change=1')
    },
    // 精确报价
    toExact(){
      console.log(this.subData)
      if(this.subData.memberPhone == ''){
        localStorage.noback = '1'
        this.improvement = true;
        return
      }
      this.subData.offerType = 'accurate'
      this.$api.insurance.saveMemberQueryInsurance(this.subData).then(res=>{
        if(res.code == 200){
          this.$store.commit('changeInsuranceData', res.data)
          this.$router.push('/expect?yes=1')
        }
        console.log(res)
      })
    },
    down(a){
      a.target.style.background = '#dd9a38'
    },
    up(a){
      a.target.style.background = '#F3B356'
    },
    // 修改
    toInsureType(){
      this.$router.push('/insureType?id=' + this.insuranceData.offer.companyId)
    },
    noBack(){
      localStorage.noback = ''
      this.improvement = false;
    },
    // 更改车辆信息
    changecarSub(a){
      this.subData.brandId = this.brandId
      this.subData.twoBrandId = this.twoBrandId
      this.subData.vehicleId = this.vehicleId
      this.subData.carId = this.carId
      this.subData.carName = this.carName
      this.subData.offer.carGuidancePrice = this.price
      this.vagueSub()
    },
    // 请求模糊报价
    vagueSub(){
      console.log(this.subData)
      this.$api.insurance.saveMemberQueryInsurance(this.subData).then(res=>{
        if(res.code == 200){
          this.$store.commit('changeInsuranceData', res.data)
          this.$store.commit('changeInsuranceSubData', this.subData)
        }
        console.log(res)
      })
    }
  },
  mounted(){
    console.log(this.insuranceData)
    this.$store.commit('changeTitle','车险报价')
    this.subData = this.insuranceSubData
    // this.changecarSub()
  },
  computed: {
    insuranceData(){
      return this.$store.getters.insuranceData
    },
    insuranceSubData(){
      return this.$store.getters.insuranceSubData
    },
    brandId(){
      if(this.$route.query.brandId){
        return this.$route.query.brandId
      }else{
        return this.subData.brandId
      }
    },
    twoBrandId(){
      if(this.$route.query.twoBrandId){
        return this.$route.query.twoBrandId
      }else{
        return this.subData.twoBrandId
      }
    },
    vehicleId(){
      if(this.$route.query.vehicleId){
        return this.$route.query.vehicleId
      }else{
        return this.subData.vehicleId
      }
    },
    carId(){
      if(this.$route.query.carId){
        return this.$route.query.carId
      }else{
        return this.subData.carId
      }
    },
    carName(){
      if(this.$route.query.carName){
        return this.$route.query.carName
      }else{
        return this.subData.carName
      }
    },
    price(){
      if(this.$route.query.price){
        return this.$route.query.price
      }else{
        return this.subData.price
      }
    },
  }
}
</script>

<style scoped lang="scss">
.vague{
  height: calc(100% - 2rem);
  overflow-y: auto;
  position: relative;
}
.pagebg{
  position: absolute;
  top: 0;left: 0;right: 0;
  height: 2.666667rem;
  z-index: -1;
  img{
    height: 100%;
    width: 100%;
    display: block;
  }
}
.pp{
  width: 7.2rem;
  text-align: center;
  color: #F1BE5B;
  img{
    display: block;
    width: 7.2rem;
    height: 4rem;
    margin-bottom: .266667rem;
  }
  .p1{
    font-size: .426667rem;
  }
  .p2{
    font-size: .373333rem;
  }
  .p4{
    font-size: .373333rem;
    width: 5.333333rem;
    margin: auto;
  }
  .p3{
    font-size:.373333rem;
    color: #999;
    margin-top: .2rem;
    font-weight: 500;
  }
  input{
    width: 5.333333rem;
    height: .8rem;
    text-align: center;
    display: block;
    margin: auto;
  }
  button{
    width: 5.333333rem;
    height: 1.066667rem;
    margin: .26rem auto 0;
    border: none;
    background: #F3B356;
    border-radius:.133333rem;
    font-weight:500;
    font-size: .426667rem;
    color: #fff;
  }
}
.carBox{
  height: 3.2rem;
  background: #fff;
  margin-top: .8rem;
  padding: .533333rem .4rem .293333rem;
  color: #333;
  .carInfo{
    display: flex;
    justify-content: space-between;
    height: 1.333333rem;
    align-items: center;
    img{
      width: 2.48rem;
      height: 100%;
      display: block;
    }
    div{
      flex: 1;
      padding-left: .333333rem;
      font-weight: 500;
      line-height: .6rem;
      font-size: .373333rem;
      p{
        color: #999;
        width: 5rem;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    span{
      line-height: 1.333333rem;
    }
  }
  span{
    font-family: '宋体';
    font-weight: bold;
    color: #999;
    font-size:.373333rem;
  }
  .bd{
    margin-top: .3rem;
  }
  .add{
    padding-top: .2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    b{
      flex: 1;
      text-align: right;
      color: #999;
      font-weight: 500;
    }
  }
}
.scheme, .baojia{
  padding: .48rem .4rem .293333rem;
  margin-top: .533333rem;
}
.title{
  p{
    display: flex;
    justify-content: space-between;
    font-size:.48rem;
    color: #333;
    margin-bottom: .1rem;
    b{
      font-size: .373333rem;
      color: #4771E6;
      span{
        color: #999;
        font-family: '宋体';
        font-size:.373333rem;
      }
    }
  }
  &>span{
    font-size: .32rem;
    color: #999;
  }
}
.baojia b{
  color: #D95A41 !important;
}
.scheme{
  li{
    display: flex;
    justify-content: space-between;
    font-size: .373333rem;
    color: #333;
    margin-top: .4rem;
    b{
      color: #999;
    }
  }
}
.fixBox{
  padding: .346667rem;
  position: fixed;
  bottom: 0;left: 0;right: 0;
  background: #fff;
}

</style>