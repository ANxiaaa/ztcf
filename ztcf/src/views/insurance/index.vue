<template>
  <div class="insurance">
    <div :style="bg">
      <div class="box container shadow">
        <div>
          <div class="xinghao" @click="toInsureAdd">
            <b class="t600">车辆型号:</b>
            <p class="t600" :style="!carData.carName?{color: '#999'}:{color: '#333'}">
              <strong>{{!carData.carName?'请选择车辆型号':carData.carName}}</strong>
              <van-icon name="arrow" size=".3rem" color="#b3b3b3"/>
            </p>
          </div>
          <div class="chepai">
            <b>车牌号:</b>
            <div>
              <label class="l1" @click="showPop(0)">
                <span>{{carData.lsprefix}}</span>
                <img :src="require('@/assets/insurance/down.png')" alt="">
              </label>
              <p class="t600" :style="carData.ifCarNumber?{color: '#999'}:{color: '#333'}">
                <input name="num" :disabled="carData.ifCarNumber" type="text" placeholder="请输入车牌号码" v-model="carData.lsnum"  @input="input" ref="input">
              </p>
              <label class="l2" @click="changeifCarNumber"><img :src="!carData.ifCarNumber?require('@/assets/no.png'):require('@/assets/yes.png')" alt="">未上牌</label>
            </div>
          </div>
          <div @click="showPop(1)" class="guoqi">
            <b class="t600">城市:</b>
            <p class="t600" style="color: #333">{{areaStr}}</p>
            <van-icon name="arrow" size=".3rem" color="#b3b3b3"/>
          </div>
          <div @click="showPop(3)" class="guoqi">
            <b class="t600">保险公司:</b>
            <p class="t600" style="color: #333">{{companyName}}</p>
            <van-icon name="arrow" size=".3rem" color="#b3b3b3"/>
          </div>
          <div @click="showPop(2)" class="guoqi">
            <b class="t600">首次登记时间:</b>
            <p class="t600" :style="carData.ifCarNumber?{color: '#999'}:{color: '#333'}">{{dateFormat(carData.firstRegisterDate)}}</p>
            <van-icon name="arrow" size=".3rem" color="#b3b3b3"/>
          </div>
        </div>
        <btn @click="toVague" style="margin-top: .746667rem;" name="确认报价"></btn>
      </div>
      <div class="liucheng container">
        <p class="lcTitle">
          <img :src="require('@/assets/insurance/liucheng.png')" alt="">
          <span class="t600">咨询流程</span>
          <img :src="require('@/assets/insurance/liucheng.png')" alt="">
        </p>
        <ul class="container">
          <li class="leftLine"></li>
          <li class="list" v-for="(i, index) in liuchengList" :key="index">
            <div>
              <img :src="require('@/assets/insurance/rec.png')" alt="">
              <b>{{index + 1}}</b>
            </div>
            <p class="t600">{{i.title}}</p>
            <span class="t600">{{i.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <van-popup v-model="show" round position="bottom">
      <van-picker v-show="showArea == 0" :default-index="15" :columns="columns" @change="onChange" class="xuanze"/>
      <van-area class="areaBox" :value="areaCode" :columns-num="2" v-show="showArea == 1" @confirm="areaChange" :area-list="areaList"/>
      <van-datetime-picker v-show="showArea == 2" :show-toolbar="false" v-model="carData.firstRegisterDate" type="date" :min-date="minDate" :max-date="maxDate"/>
      <van-picker v-show="showArea == 3" :columns="firm" @change="firmChange" value-key="companyName" class="xuanze"/>
    </van-popup>
  </div>
</template>

<script>
import { format } from '@/utils/date'
import btn from '@/components/input/btn'
import areaList from '@/utils/area'
export default {
  name: 'insurance',
  components:{
    btn
  },
  data () {
    return {
      bg: { // 背景
        background: `url(${require('@/assets/insurance/indexTop.png')}) no-repeat`,
        backgroundSize: '100% 4.32rem',
        paddingTop: 230 / 75 + 'rem'
      },
      // 显示
      show: false,
      areaList,
      areaStr: '',
      // 汽车信息
      carData: {
        carName: '',
        lsprefix: '豫',
        lsnum: '',
        ifCarNumber: false, //false 未上牌  true 上牌
        firstRegisterDate: new Date()
      },
      areaCode: '410000',
      showArea: 0,
      bureau: [],
      firm: [],
      // 下面字的显示内容
      liuchengList: [{
        title: '添加车辆信息，点击确认报价',
        name: '输入车辆相关信息，查看模糊报价。'
      },{
        title: '可调整报价方案，得到郑泰车险报价',
        name: '完善车辆信息后，可得到模糊报价。。'
      },{
        title: '选择想要购买的保险种类',
        name: '精准报价为保险公司实际报价。'
      },{
        title: '点击线上下单，完成保险购买',
        name: '选择保险公司报价，进入可收藏、咨询、购买等操作。'
      }],
      // 省份
      columns: ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新'],
      subData: {},
      province: '',
      city: '',
      minDate: new Date(2000, 0, 1),
      maxDate: new Date(),
      companyName: ''
    }
  },
  methods:{
    // 跳转车险报价
    toVague(){
      this.isSub()
      this.subData.firstRegisterDate = this.carData.firstRegisterDate
      if(Object.keys(this.userData) > 0){
        this.subData.memberId = userData.memberId
        this.subData.memberPhone = userData.memberPhone
      }
      console.log(this.subData)
      this.$api.insurance.saveMemberQueryInsurance(this.subData).then(res=>{
        if(res.code == 200){
          this.$store.commit('changeInsuranceData', res.data)
          this.$store.commit('changeInsuranceSubData', this.subData)
          this.$router.push('/vague')
        }else{
          this.Toast.fail(res.msg)
        }
        console.log(res)
      })
    },
    // 改变是否上牌
    changeifCarNumber(){
      this.carData.ifCarNumber = !this.carData.ifCarNumber;
    },
    // 展示弹窗
    showPop(i){
      this.showArea = i
      this.show = true
    },
    // 更改城市
    areaChange(a){
      this.areaStr = a[0].name + a[1].name
      this.province = a[0].name
      this.city = a[1].name
      this.show = false
    },
    // 限制长度
    getByteLen(val) {
      let len = 0;
      let res = '';
      for (let i = 0; i < val.length; i++) {
        let a = val.charAt(i);
        if (!/.*[\u4e00-\u9fa5]+.*$/.test(a) && !/\s+/.test(a)) {
          if(len >= 6){
            break
          }
          len ++;
          res += val[i]
        }
      }
      return res;
    },
    // 监听输入框改变
    input(a) {
      var input = this.$refs.input;
      let res = this.getByteLen(input.value).toUpperCase()
      this.$set(this.carData, 'lsnum', res)
    },
    // 保险公司变更
    firmChange(picker, value, index){
      console.log(picker, value, index)
      this.subData.offer.companyId = value.id
      this.subData.offer.insuranceCompany = value.companyName
      this.companyName = value.companyName
    },
    // 更改字
    onChange(picker, value, index) {
      this.carData.lsprefix = value
      let list = this.areaList.province_list
      this.bureau.forEach(i => {
        if(i.lsprefix == value){
          for(let j in list){
            if(list[j].indexOf(i.province) != -1){
              this.areaCode = j
              this.areaStr = list[j]
            }
          }
        }
      })
    },
    isSub(){
      let _this = this
      this.subData = {
        "brandId": _this.brandId, // 品牌ID
        "carId": _this.carId, // 车ID
        "carInfoId": null, // 用户车辆ID
        "carName": _this.carName, // 车辆名称
        "city": _this.city, // 投保城市
        "createDate": "", // 创建时间
        "firstRegisterDate": _this.carData.firstRegisterDate, // 首次登记时间
        "id": null,
        "ifCarNumber": !_this.carData.ifCarNumber ? 1 : 0, // 是否上牌 1或者0 1已经上牌 0未上牌
        "lsnum": _this.carData.lsnum, // 车牌剩余部分
        "lsprefix": _this.carData.lsprefix, // 车牌前缀
        "memberId": null, // 用户ID
        "memberPhone": "", // 手机号
        "offer": { // 保险 - 报价信息实体
          "carEvaluation": "", // 车辆估价
          "carGuidancePrice": _this.price, // 车辆指导价
          "carYears": null, // 车辆年限
          "categorys": null,
          // [ // 保险投保类目
          //   { // 保险 - 报价类目明细实体
          //     "category": "", // 保险类目
          //     "categoryId": null, // 保险类目ID
          //     "code": "",
          //     "id": null,
          //     "offerId": null, // 保险报价id
          //     "subitemId": null, // 保险类目子项ID
          //     "unitPrice": "" // 保险单价
          //   }
          // ]
          "city": _this.city, // 投保城市
          "companyId": null, // 保险公司ID
          "depreciationRate": "", // 折旧率百分比
          "handleDate": "", // 处理时间
          "handleUser": "", // 处理人
          "id": null,
          "insuranceCompany": "", // 保险公司
          "minfoId": null,
          "province": _this.province, // 投保省份
          "totalPrice": "" // 最终报价
        },
        "offerType": "vague", // 报价类型  vague 模糊 accurate 精准
        "permitId": null, // 行驶证ID
        "province": _this.province, // 投保省份
        "twoBrandId": _this.twoBrandId, // 二级品牌ID
        "vehicleId": _this.vehicleId // 车型id
      }
    },
    // 格式化时间
    dateFormat(time){
      return format(time)
    },
    // 跳转添加车辆
    toInsureAdd(){
      if(this.allCar.length){
        this.$router.push('/insureAddCar')
      }else{
        this.$api.carList.allOneCar().then(res=>{
          if(res.code == 200){
            let arr = []
            res.data.forEach(i=>{
                arr.push(i.initial)
            })
            let indexList = [...new Set(arr)].sort()
            this.$store.commit('changeAllCar',res.data)
            this.$store.commit('changeAllIndexList',indexList)
            this.$router.push('/insureAddCar')
          }else{
            this.Toast.fail('获取失败, 请重试!')
          }
        })
      }
    }
  },
  mounted(){
    this.$api.apisearch.getManagerBureau().then(res=>{
      this.bureau = res.data
    })
    this.$api.insurance.getCompanys().then(res => {
      this.firm = res.data
    })
    console.log(this.userData)
  },
  activated(){
    let _this = this
    console.log(_this.province, _this.city)
    this.$store.commit('changeTitle','车险报价')
    if(this.carName){
      this.$set(this.carData, 'carName', this.carName)
    }
    this.isSub()
  },
  computed: {
    allCar(){
      let data = this.$store.getters.allCar
      return data
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
    userData(){
      return this.$store.getters.userData
    },
  }
}
</script>

<style scoped lang="scss">
.insurance{
  height: calc(100% - 1.306667rem);
  overflow-y: auto;
}
.box{
  padding: .666667rem .4rem;
  b{
    font-weight: 500;
    color: #999;
    font-size:.4rem;
    white-space: pre;
  }
  label{
    white-space: pre;
    color: #999;
    font-weight: bold;
    // flex: 1;
  }
  .xinghao{
    height: .666667rem;
    display: flex;
    line-height: .666667rem;
    p{
      font-size:.373333rem;
      font-weight: 500;
      position: relative;
      flex: 1;
      line-height: .62rem;
      margin-left: .1rem;
      border-bottom: .013333rem solid #F2F4F7;
      white-space: pre;
      display: flex;
      strong{
        flex: 1;
        width: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i{
        line-height: .45rem
      }
      span{
        font-family: '宋体';
        font-weight: bold;
        color: #999;
        position: absolute;
        right: 0;
      }
    }
  }
  .chepai{
    margin-top: .4rem;
    display: flex;
    div{
      flex: 1;
      padding-left: .35rem;
      border-bottom: .013333rem solid #F2F4F7;
      display: flex;
      justify-content: space-between;
      line-height: .6rem;
      .l1{
        img{
          width: .266667rem;
          height: .16rem;
          vertical-align: super;
        }
      }
      input{
        flex: 1;
        border: none;
        height: .373333rem;
        &::placeholder{
          font-weight: bold;
          color: #999;
          font-size: .3rem;
        }
      }
      .l2{
        display: flex;
        img{
          height: .32rem;
          width: .32rem;
          margin-top: .15rem;
          margin-right: .1rem;
        }
      }
    }
  }
}
.liucheng{
  margin-top: 1.066667rem;
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
  ul{
    position: relative;
    margin-bottom: .9rem;
    .list{
      margin-top: .533333rem;
      position: relative;
      padding-left: .88rem;
      font-weight: 500;
      div{
        position: absolute;
        left: 0;
        top: 0;
        width: .586667rem;
        height: .586667rem;
        img{
          width: .586667rem;
          height: .586667rem;
          display: block;
        }
        b{
          position: absolute;
          top: 0;right: 0;left: 0;bottom: 0;
          margin: auto;
          text-align: center;
          line-height: .586667rem;
          font-size:.32rem;
          font-family:Lato;
          font-weight:normal;
          color:#fff;
          text-shadow:0px 0px 5px rgba(204,136,47,0.8);
        }
      }
      p{
        line-height: .586667rem;
        font-size:.4rem;
        color:#999;
      }
      span{
        line-height: .586667rem;
        font-size:.32rem;
        color:#999;
      }
    }
    .leftLine{
      position: absolute
    }
  }
}
.guoqi{
  margin-top: .4rem;
  display: flex;
  justify-content: space-between;
  p{
    font-weight: bold;
    flex: 1;
    padding-left: .35rem;
    border-bottom: .013333rem solid #F2F4F7;
  }
}
.xuanze{
  padding: 0;
  bottom: 0;
  left: 0;right: 0;
  z-index: 2;
  width: 100%;
  border-top: .013333rem solid #ececec
}
</style>
<style scoped>
.xuanze >>> div{
  width: 100%;
}
>>> .areaBox .van-picker__columns > div:first-child{
  display: none;
}
</style>