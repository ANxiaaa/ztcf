<template>
  <div class="my">
    <div :style="bg">
      <div class="title container" @click="login">
        <div class="touxiang">
          <img :src="userData.headImg" alt="">
        </div>
        <div class="isLogin">
          <div class="login" v-if="isLogin">
            <p class="t600">{{userData.nickName}}</p>
            <p class="t600 t2">邀请码: {{userData.referralCode}}</p>
          </div>
          <div v-else>
            <h5 class="t600">您目前还未登录, 请登录</h5>
          </div>
        </div>
        <span>></span>
      </div>
      <div class="shoucang container">
        <div class="shadow" v-for="i in shoucang" :key="i.name">
          <img :src="i.url" alt="">
          <p class="t600">{{i.name}}</p>
          <span>></span>
        </div>
      </div>
      <div class="dingdan container shadow">
        <my-title :click="toDingdan" :data="myDingdan"></my-title>
        <ul>
          <li v-for="i in dingdanList" :key="i.name">
            <img :src="i.pic" alt="">
            <p class="t600">{{i.name}}</p>
          </li>
        </ul>
      </div>
      <div class="carList container shadow">
        <my-title :data="myCar"></my-title>
        <div class="car" v-if="true">
          <img :src="car[0].pic" alt="">
          <div  class="t600">
            <p>{{car[0].num}}</p>
            <span>{{car[0].xh}}</span>
          </div>
        </div>
        <div class="addCar" v-else>
          <div @touchstart="down" @touchend="up"><span>+</span> 添加车辆</div>
          <p class="t600">添加车辆, 用车生活更方便快捷</p>
        </div>
      </div>
      <div class="yaoqing container">
        <img :src="yaoqing" alt="">
      </div>
      <div class="gongneng">
        <ul>
          <li @touchstart="down" @touchend="up" v-for="i in gongnengList" @click="i.click" :key="i.name">
            <img :src="i.pic" alt="">
            <p class="t600">{{i.name}}</p>
            <span>></span>
            <div class="bd"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import myTitle from '@/components/myTitle'
import { mapState } from 'vuex'
export default {
  name: 'my',
  components:{
    myTitle
  },
  data () {
    return {
      bg: {
        background: `url(${require('@/assets/my/indexTop.png')}) no-repeat`,
        backgroundSize: '100% 3.733333rem',
      },
      shoucang: [{
        url: require('@/assets/my/shoucang.png'),
        name: '我的收藏',
      },{
        url: require('@/assets/my/jilu.png'),
        name: '浏览记录',
      }],
      myDingdan: {
        name: '我的订单',
        fs: 32,
        lh: 1
      },
      dingdanList: [{
        pic: require('@/assets/my/dd1.png'),
        name: '代付款'
      },{
        pic: require('@/assets/my/dd2.png'),
        name: '接单中'
      },{
        pic: require('@/assets/my/dd3.png'),
        name: '出单中'
      },{
        pic: require('@/assets/my/dd4.png'),
        name: '已出单'
      },{
        pic: require('@/assets/my/dd5.png'),
        name: '取消订单'
      }],
      myCar: {
        name: '我的车库',
        fs: 32,
        lh: 1
      },
      car: [{
        pic: require('@/assets/my/car.png'),
        num: '豫ABZ539',
        xh: '奥迪A3系2019款豪华版'
      }],
      yaoqing: require('@/assets/my/yaoqing.png'),
      gongnengList:[{
        pic: require('@/assets/my/xiaoxi.png'),
        name: '消息通知',
        click: this.tosetting
      },{
        pic: require('@/assets/my/zixun.png'),
        name: '在线咨询',
        click: this.toadvisory
      },{
        pic: require('@/assets/my/shezhi.png'),
        name: '设置',
        click: this.tosetting
      },{
        pic: require('@/assets/my/guanyu.png'),
        name: '关于郑泰',
        click: this.tosetting
      }]
    }
  },
  methods:{
    toDingdan(){
      this.$router.push('/order')
    },
    tosetting(){
      this.$router.push('/setting')
    },
    toadvisory(){
      this.$router.push('/toadvisory')
    },
    down(a,b,c){
      a.path.forEach(i=>{
        if(i.tagName === 'LI'){
            i.style.background = '#ececec'
        }
      })
    },
    up(a){
      a.path.forEach(i=>{
        if(i.tagName === 'LI'){
            i.style.background = 'none'
        }
      })
    },
    login(){
      if(!this.isLogin){
        this.$router.push('/login')
      }else{
        this.$router.push('/personal')
      }
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '个人中心')
  },
  computed:{
    isLogin(){
      return localStorage.isLogin
    },
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    }
  }
}
</script>

<style scoped lang="scss">
.my{
  height: calc(100% - 1.306667rem);
  overflow-y: scroll;
}
.title{
  height: 1.6rem;
  box-sizing: content-box;
  margin-bottom: .44rem;
  display: flex;
  justify-content: space-between;
  padding-top: .64rem;
  .touxiang{
    width: 1.6rem;
    height: 1.6rem;
    border-radius: 50%;
    border: .053333rem solid #fff;
    overflow: hidden;
    img{
      height: 100%;
      width: 100%;
    }
  }
  .isLogin{
    flex: 1;
    padding: .333333rem;
    color: #fff;
    .login{
      font-size:.426667rem;
      p{
        line-height: 1;
      }
      .t2{
        font-size: .32rem;
        font-weight: 500;
        margin-top: .2rem;
      }
    }
  }
  span{
    line-height: 1.6rem;
    font-family: '宋体';
    font-weight: bold;
    color: #fff;
    font-size: .32rem;
  }
  h5{
    line-height: .95rem;
    font-size: .426667rem;
  }
}
.shoucang {
  height: 1.6rem;
  display: flex;
  justify-content: space-between;
  div{
    width: 4.4rem;
    height: 1.6rem;
    padding: .32rem;
    display: flex;
    justify-content: space-between;
    img{
      height: .96rem;
      width: .96rem;
      margin-right: .213333rem;
    }
    p{
      flex: 1;
      font-weight: 500;
      line-height: .96rem;
      font-size: .373333rem;
    }
    span{
      font-family: '宋体';
      font-weight: bold;
      line-height: .96rem;
      color: #b3b3b3;
      font-size: .32rem;
    }
  }
}
.dingdan{
  height: 2.866667rem;
  margin-top: .533333rem;
  ul{
    margin-top: .213333rem;
    display: flex;
    justify-content: space-between;
    li{
      width: 25%;
      text-align: center;
      img{
        width: .666667rem;
        height: .666667rem;
        display: block;
        margin: auto
      }
      p{
        margin-top: .306667rem;
        font-size:.346667rem;
        font-weight: 500;
        line-height: 1;
        color: #999999
      }
    }
  }
}
.carList{
  margin-top: .533333rem;
  height: 3.2rem;
  .car{
    margin-top: .213333rem;
    padding: 0 .36rem;
    display: flex;
    justify-content: space-between;
    img{
      width: 2.466667rem;
      height: 1.293333rem;
      margin-right: .346667rem;
    }
    .t600{
      height: 1.293333rem;
      flex: 1;
      font-weight: 500;
      p{
        font-size:.426667rem;
        color: #333333;
        line-height: .586667rem
      }
      span{
        color: #B3B3B3;
        font-size:.32rem;
        line-height: .65rem
      }
    }
  }
  .addCar{
    margin-top: .213333rem;
    padding: 0 .36rem;
    text-align: center;
    font-weight: 500;
    div{
      width: 2.773333rem;
      height: .64rem;
      margin: auto;
      border:.026667rem solid rgba(46,107,230,1);
      border-radius:.32rem;
      color: #2E6BE6;
      font-size:.373333rem;
      line-height: .586667rem;
      span{
        font-size: .466667rem;
        vertical-align: text-top;
        line-height: .533333rem;
        font-family: '宋体';
        font-weight: bold;
      }
    }
    p{
      font-size:.32rem;
      line-height: 1;
      margin-top: .173333rem;
      color: #999;
    }
  }
}
.yaoqing{
  margin-top: .666667rem;
  height: 2.133333rem;
  box-shadow: 0 1px 20px 8px rgba(236,120,95,0.3);
  border-radius: 1.066667rem;
  img{
    width: 100%;
    height: 100%
  }
}
.gongneng {
  margin-top: .266667rem;
  margin-bottom: 2rem;
  ul{
    width: 10rem;
    margin: auto;
  }
  li{
    display: flex;
    justify-content: space-between;
    padding: .373333rem .4rem;
    position: relative;
    img{
      height: .533333rem;
      width: .533333rem;
    }
    p{
      flex: 1;
      margin-left: .36rem;
      font-size:.4rem;
      font-weight: 500;
      line-height: .533333rem;
      color: #666666;
    }
    span{
      font-family: '宋体';
      font-weight: bold;
      color: #b3b3b3;
      font-size: .32rem;
    }
  }
}
.bd{
  position: absolute;
}
</style>