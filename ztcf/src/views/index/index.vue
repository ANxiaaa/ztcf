<template>
  <div class="index">
    <div :style="bg">
      <p class="title t600 container">欢迎来到郑泰车服!</p>
      <div class="topBar container">
        <div v-if="true" @click.stop="addCar">
          <p class="t600">用车生活更方便快捷</p>
          <button @touchstart="down" @touchend="up" class="t600">添加爱车</button>
          <img :src="require('@/assets/index/topBarCar.png')" alt="">
        </div>
        <div v-else>
          123456
        </div>
      </div>
      <ul class="find container">
        <li v-for="(i, index) in findList" :key="index">
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
      <div class="yingjian">
        <div class="line line1"></div>
        <page-title :data="yingjian.title"></page-title>
        <toppic :data="yingjianList"></toppic>
        <div class="line"></div>
      </div>
      <div class="ad" v-for="(i, index) in ad" :key="index">
        <img :src="i" alt="">
      </div>
      <div class="tejiache" v-if="true">
        <div class="line"></div>
        <p class="tjctitle container t600">
          <img :src="require('@/assets/index/tjc1.png')" alt="">
          特价车
          <img :src="require('@/assets/index/tjc2.png')" alt="">
        </p>
        <leftpic :data="tjcList"></leftpic>
      </div>
    </div>
  </div>
</template>

<script>
import pageTitle from '@/components/pageTitle'
import toppic from '@/components/list/toppic'
import leftpic from '@/components/list/leftpic'
export default {
  name: 'index',
  components:{
    pageTitle,
    toppic,
    leftpic
  },
  data () {
    return {
      bg: { // 背景图片
        background: `url(${require('@/assets/index/indexTop.png')}) no-repeat`,
        backgroundSize: '100% 2.666667rem',
      },
      findList:[{ // api查询
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      },{
        name: '违章查询',
        url: require('@/assets/index/find/wzcx.png')
      }],
      xufeiList: [{ // 两个按钮
        name: 'GPS续费',
        url: require('@/assets/index/find/xufei1.png')
      },{
        name: '车险估价',
        url: require('@/assets/index/find/xufei2.png')
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
      tjcList: [{ // 特价车推荐
        url: require('@/assets/index/tjclist.png'),
        title: '2019款DBS superlrggrra',
        label: ['奥迪-A3','2019款'],
        price: '20万',
        sale: '15万',
        rate: 5
      },{
        url: require('@/assets/index/tjclist.png'),
        title: '2019款DBS superlrggrra',
        label: ['奥迪-A3','2019款'],
        price: '20万',
        sale: '15万',
        rate: 5
      },{
        url: require('@/assets/index/tjclist.png'),
        title: '2019款DBS superlrggrra',
        label: ['奥迪-A3','2019款'],
        price: '20万',
        sale: '15万',
        rate: 5
      },{
        url: require('@/assets/index/tjclist.png'),
        title: '2019款DBS superlrggrra',
        label: ['奥迪-A3','2019款'],
        price: '20万',
        sale: '15万',
        rate: 5
      },{
        url: require('@/assets/index/tjclist.png'),
        title: '2019款DBS superlrggrra',
        label: ['奥迪-A3','2019款'],
        price: '20万',
        sale: '15万',
        rate: 5
      },{
        url: require('@/assets/index/tjclist.png'),
        title: '2019款DBS superlrggrra',
        label: ['奥迪-A3','2019款'],
        price: '20万',
        sale: '15万',
        rate: 5
      },{
        url: require('@/assets/index/tjclist.png'),
        title: '2019款DBS superlrggrra',
        label: ['奥迪-A3','2019款'],
        price: '20万',
        sale: '15万',
        rate: 5
      }]
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
      console.log(1)
      this.$router.push('/indexAddCar')
    }
  },
  mounted(){
    this.$store.commit('changeTitle','郑泰车服')
  },
  computed:{

  }
}
</script>

<style scoped lang="scss">
.index{
  height: calc(100% - 1.306667rem);
  overflow-y: scroll;
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
      font-weight: 500
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
    font-family:Alibaba PuHuiTi;
    b{
      font-size: .426667rem;
      line-height: 1
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
  margin-top: .533333rem;
  .tjctitle{
    height: 1.466667rem;
    line-height: 1;
    padding: .533333rem 0;
    display: flex;
    justify-content: center;
    color: #333333;
    img{
      height: .4rem;
      width: .4rem;
      margin: 0 .2rem;
    }
  }
}
</style>