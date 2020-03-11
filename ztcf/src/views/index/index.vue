<template>
  <div class="index">
    <div :style="bg">
      <p class="title t600 container">欢迎来到郑泰车服!</p>
      <div class="topBar container">
        <div class="addCarBox" v-if="userData.defaultCarInfo == null" @click.stop="addCar">
          <p class="t600">用车生活更方便快捷</p>
          <button @touchstart="down" @touchend="up" class="t600">添加爱车</button>
          <img :src="require('@/assets/index/topBarCar.png')" alt="">
        </div>
        <div class="defultCar" v-else>
          <img :src="require('@/assets/my/car.png')" alt="">
          <div>
            <p>{{userData.defaultCarInfo.carNumberPrefix}}{{userData.defaultCarInfo.carNumber}}</p>
            <span>{{userData.defaultCarInfo.carName}}</span>
          </div>
        </div>
      </div>
      <ul class="find container">
        <li v-for="(i, index) in findList" :key="index" @click="i.click">
          <img :src="i.url" alt="">
          <p class="t600">{{i.name}}</p>
        </li>
      </ul>
      <div class="xufei container">
        <div v-for="(i, index) in xufeiList" :key="index">
          <b>{{i.name}}</b>
          <p class="t600">立即估价</p>
          <img :src="i.url" alt="">
        </div>
      </div>
      <div v-if="false" class="yingjian">
        <div class="line line1"></div>
        <page-title :data="yingjian.title"></page-title>
        <toppic :data="yingjianList"></toppic>
      </div>
        <div class="line"></div>
      <div @click="$router.push('/test')" class="ad" v-for="(i, index) in ad" :key="index">
        <img :src="i" alt="">
      </div>
      <div class="tejiache" v-if="true">
        <div class="line"></div>
        <p class="tjctitle container t600">
          <img :src="require('@/assets/index/tjc1.png')" alt="">
          特价车
          <img :src="require('@/assets/index/tjc2.png')" alt="">
        </p>
        <leftpic @click="toMsg" :data="tjcList" :prop="{title: 'name',url: 'img',sale: 'showCost'}"></leftpic>
      </div>
    </div>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle'
import toppic from '@/components/list/toppic'
import leftpic from '@/components/list/leftpic'
import { baseUrl } from '@/utils/global'
export default {
  name: 'index',
  components:{
    pageTitle,
    toppic,
    leftpic
  },
  data () {
    let _this = this
    return {
      bg: { // 背景图片
        background: `url(${require('@/assets/index/indexTop.png')}) no-repeat`,
        backgroundSize: '100% 2.666667rem',
      },
      findList:[{ // api查询
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png'),
        click: _this.wzcx
      },{
        name: '加油站查询',
        url: require('@/assets/index/find/jyz.png'),
        click: _this.jyzcx
      },{
        name: '限行查询',
        url: require('@/assets/index/find/xxcx.png'),
        click: _this.xxcx
      },{
        name: '油卡充值',
        url: require('@/assets/index/find/ykcx.png'),
        click: _this.ykcx
      },{
        name: '公交查询',
        url: require('@/assets/index/find/gjcx.png'),
        click: _this.gjcx
      },{
        name: '违章代办',
        url: require('@/assets/index/find/wzdb.png'),
        click: _this.expect
      },{
        name: '停车场查询',
        url: require('@/assets/index/find/tcccx.png'),
        click: _this.tcccx
      },{
        name: '快递查询',
        url: require('@/assets/index/find/kdcx.png'),
        click: _this.kdcx
      },{
        name: 'vin查询',
        url: require('@/assets/index/find/vin.png'),
        click: _this.vin
      },{
        name: '其他查询',
        url: require('@/assets/index/find/qtcx.png'),
        click: _this.expect
      }],
      xufeiList: [{ // 两个按钮
        name: 'GPS续费',
        url: require('@/assets/index/find/xufei1.png'),
        click: _this.expect
      },{
        name: '车险估价',
        url: require('@/assets/index/find/xufei2.png'),
        click: _this.expect
      }],
      // 图片
      ad: [require('@/assets/index/ad.png')],
      yingjian:{
        title: {
          icon: require('@/assets/index/yingjian.png'),
          name: '车载硬件'
        }
      },
      yingjianList:[{ // 商品
        url: require('@/assets/index/yingjianlist.png'),
        price: 369,
        oldprice: 369
      },{
        url: require('@/assets/index/yingjianlist.png'),
        price: 369,
        oldprice: 369
      },{
        url: require('@/assets/index/yingjianlist.png'),
        price: 369,
        oldprice: 369
      },{
        url: require('@/assets/index/yingjianlist.png'),
        price: 369,
        oldprice: 369
      }],
       // 特价车推荐
      tjcList: []
    }
  },
  methods:{
    // 点击反馈
    down(a){
      a.target.style.background = '#073694'
    },
    up(a){
      a.target.style.background = '#2E6BE6'
    },
    // 添加汽车
    addCar(){
      this.$router.push('/indexAddCar')
    },
    // 违章查询
    wzcx(){
      this.$router.push('/indexwzcx')
    },
    // 公交查询查询
    gjcx(){
      this.$router.push('/indexgjcx')
    },
    // vin查询
    vin(){
      this.$router.push('/vin')
    },
    // 限行查询
    xxcx(){
      this.$router.push('/indexxxcx')
    },
    // 油卡查询
    ykcx(){
      this.$router.push('/indexykcx')
    },
    // 快递查询
    kdcx(){
      this.$router.push('/indexkdcx')
    },
    // 加油站查询
    jyzcx(){
      this.$router.push('/indexjyzcx')
    },
    // 停车场查询
    tcccx(){
      this.$router.push('/indextcccx')
    },
    // 敬请期待
    expect(){
      this.$router.push('/expect')
    },
    // 转换小数
    toFiexd2(num){
      num = num.toString()
      if(num.indexOf('.') != -1 && (num.slice(num.indexOf('.'))).length > 2){
        return (Number(num)).toFixed(2)
      }else{
        return Number(num)
      }
    },
    // 选择特价车
    toMsg(item){
      console.log(item)
      this.$router.push('/carMsg?id=' + item.id)
    }
  },
  mounted(){
    let _this = this
    this.$store.commit('changeTitle','郑泰车服')
    this.$api.sale.findIndexSpecialPage('index').then(res=>{
      console.log(res)
      res.data.data.content.forEach(i=>{
        i.img = baseUrl + i.img
        i.rate = _this.toFiexd2((1 - (i.showCost / i.price)) * 100)
        i.showCost = _this.toFiexd2(i.showCost / 10000) + '万'
        i.price = _this.toFiexd2(i.price / 10000) + '万'
      })
      this.tjcList = res.data.data.content
    })
    console.log(this.userCarInfo)
    console.log(this.userData)
  },
  computed:{
    userCarInfo(){
      return this.$store.getters.userCarInfo
    },
    userData(){
      return this.$store.getters.userData
    },
  },
}
</script>

<style scoped lang="scss">
.index{
  height: calc(100% - 1.306667rem);
  overflow-y: auto;
}
.title{
  padding: .36rem 0;
  font-size: .48rem;
  color: #fff;
}
.topBar{
  height: 2.666667rem;
  border-radius: .266667rem;
  position: relative;
  background: #fff;
  box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.4);
  padding-left: .533333rem;
  .addCarBox{
    p{
      padding: .533333rem 0 .4rem;
      font-size: .453333rem;
    }
    button{
      width: 2.133333rem;
      height: .64rem;
      opacity: .8;
      border-radius: .32rem;
      font-size: .373333rem;
      color: #fff;
      outline: none;
      border: none;
      background: #2E6BE6;
    }
    img{
      position: absolute;
      right: 0;
      top: 0;
      width: 3.706667rem;
      height: 2.666667rem;
    }
  }
  .defultCar{
    display: flex;
    justify-content: space-between;
    height: 100%;
    align-items: center;
    img{
      width: 3rem;
    }
    div{
      flex: 1;
      margin-left: .4rem;
      line-height: .8rem;
      p{
        font-size: .5rem;
        font-weight: bold;
      }
      span,p{
        width: 100%;
        // overflow-x: auto;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre;
      }
    }
  }
}
.find{
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: .3rem;
  li{
    width: 20%;
    text-align: center;
    margin-top: .18rem;
    font-size: .346667rem;
    img{
      width: 1.066667rem;
      height: 1.066667rem;
      margin: .2rem auto;
      display: block;
    }
    p{
      font-weight: 500;
      font-size: .25rem
    }
  }
}
.xufei{
  margin: .533333rem auto;
  display: flex;
  justify-content: space-between;
  div{
    width: 4.4rem;
    height: 1.866667rem;
    padding: .4rem 0 0 .4rem;
    position: relative;
    border-radius: .133333rem;
    b{
      font-size: .426667rem;
      line-height: 1;
    }
    p{
      margin-top: .24rem;
      width: 1.6rem;
      height: .533333rem;
      text-align: center;
      line-height: .533333rem;
      border-radius: .266667rem;
      font-weight: 500;
    }
    img{
      position: absolute;
      right: 0;
      top: 0;
      width: 2.133333rem;
      height: 1.866667rem;
    }
    &:nth-child(1){
      background: #F7F0EB;
      color: #B35540;
      p{
        background: #B35540;
        color: #fff;
      }
    }
    &:nth-child(2){
      background: #E9F2F1;
      color: #2E998E;
      p{
        background: #2E998E;
        color: #fff;
      }
    }
  }
}
.line1{
  height: 2px;
}
.ad{
  width: 10rem;
  margin: auto;
  img{
    width: 100%;
  }
}
.tejiache{
  .tjctitle{
    height: 1.466667rem;
    padding: .533333rem 0;
    display: flex;
    justify-content: center;
    color: #333333;
    font-weight: bold;
    align-items: center;
    img{
      height: .4rem;
      width: .4rem;
      margin: 0 .5rem;
    }
  }
}
</style>