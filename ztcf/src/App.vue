<template>
  <div id="app">
    <!-- <top-title></top-title> -->
    <keep-alive :include="keep">
      <router-view/>
    </keep-alive>
    <ul id="nav" v-if="!isNav">
      <li v-for="(i,index) in navList" :key="index">
        <router-link :to="i.link" replace>
          <img class="ativeUrl" :src="i.ativeUrl" alt="">
          <img :src="i.url" alt="">
          <span>{{i.name}}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'App',
  data(){
    return {
      keep: ['indexAddCar', 'insurance', 'information'],
      // 缓存的页面
      include: ['register'],
      // 主导航
      navList: [{
        name: '首页',
        url: require('@/assets/index.png'),
        ativeUrl: require('@/assets/index1.png'),
        link: '/index'
      },{
        name: '特价车',
        url: require('@/assets/sale.png'),
        ativeUrl: require('@/assets/sale1.png'),
        link: '/sale'
      },{
        name: '咨讯',
        url: require('@/assets/information.png'),
        ativeUrl: require('@/assets/information1.png'),
        link: '/information'
      },{
        name: '车险',
        url: require('@/assets/insurance.png'),
        ativeUrl: require('@/assets/insurance1.png'),
        link: '/insurance'
      },{
        name: '我的',
        url: require('@/assets/my.png'),
        ativeUrl: require('@/assets/my1.png'),
        link: '/my'
      }]
    }
  },
  mounted(){
    console.log(this.$route.meta)
    console.log([
        "                   _ooOoo_",
        "                  o8888888o",
        "                  88\" . \"88",
        "                  (| -_- |)",
        "                  O\\  =  /O",
        "               ____/`---'\\____",
        "             .'  \\\\|     |//  `.",
        "            /  \\\\|||  :  |||//  \\",
        "           /  _||||| -:- |||||-  \\",
        "           |   | \\\\\\  -  /// |   |",
        "           | \\_|  ''\\---/''  |   |",
        "           \\  .-\\__  `-`  ___/-. /",
        "         ___`. .'  /--.--\\  `. . __",
        "      .\"\" '<  `.___\\_<|>_/___.'  >'\"\".",
        "     | | :  `- \\`.;`\\ _ /`;.`/ - ` : | |",
        "     \\  \\ `-.   \\_ __\\ /__ _/   .-` /  /",
        "======`-.____`-.___\\_____/___.-`____.-'======",
        "                   `=---='",
        "^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",
        "         佛祖保佑              永无BUG"
    ].join('\n'));
    new this.$vconsole();
  },
  computed:{
    // 是否隐藏导航
    isNav(){
      return this.$route.meta.hideNav
    },
    keep(){
      return this.$store.getters.keep
    },
  }
}
</script>

<style lang="scss">
@font-face{
  font-family: 'songti';
  src: require('@/assets/songti.ttf');
}
*{
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.bd{
  height: .026667rem;
  left: 0;right: 0;bottom: 0;
  background: #F2F4F7;
  margin: 0 .4rem;
}
.t600{
  font-family: '微软雅黑', Arial;
  font-weight:600;
}
#app{
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  // padding-top: 1.173333rem;
  #nav{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 1.306667rem;
    background: #fff;
    z-index: 10;
    display: flex;
    padding-top: .133333rem;
    justify-content: space-between;
    border-top: 1px solid #ececec;
    li{
      flex: 1;
      position: relative;
      padding-top: .666667rem;
      .router-link-active{
        .ativeUrl{
          z-index: 1;
        }
        span{
          color: #2E6BE6;
        }
      }
      a{
        display: block;
        height: 100%;
        text-align: center;
        text-decoration: none;
        color: #8F9BB3;
        font-size: .32rem;
      }
      img{
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: auto;
        width: .64rem;
        height: .64rem;
      }
    }
  }
}
.container{
  margin: auto;
  width: 9.2rem;
}
.line{
  background: #F2F4F7;
  height: .213333rem;
}
.shadow{
  border-radius: .133333rem;
  background: #fff;
  box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.19);
}
.van-tab__pane, .van-tabs__content{
  min-height: 85vh
}
.notPage{
  position: absolute;
  width: 5rem;
  left: 0;right: 0;
  margin: auto;
  top: 20%;
  margin: auto;
  img{
      width: 100%;
  }
  p{
      font-size: .5rem;
      text-align: center;
      margin-top: -.9rem;
      color: #999;
  }
}
</style>