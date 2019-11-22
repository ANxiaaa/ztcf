<template>
  <div class="carMsg">
    <img :src="require('@/assets/sale/goods.png')" alt="" class="top">
    <div class="msg t600">
      <div class="container">
        <p class="price">特价: 15万<span>官方指导价: 20万</span></p>
        <p class="jianglv"><span>降率: 5%</span><b @click="tocanshu(0)">详细参数</b></p>
        <p class="name">宝马 3 系 2019款3251 运动曜夜版</p>
        <p class="time">活动时间: 2019.10.13-2019.12.12</p>
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
          <p><span>外观颜色:</span>黑 / 灰</p>
          <div class="bd"></div>
        </li>
        <li>
          <p><span>外观颜色:</span>黑 / 灰</p>
          <div class="bd"></div>
        </li>
        <li>
          <p><span>外观颜色:</span>黑 / 灰</p>
          <div class="bd"></div>
        </li>
        <li>
          <p><span>外观颜色:</span>黑 / 灰</p>
          <div class="bd"></div>
        </li>
        <li>
          <p><span>外观颜色:</span>黑 / 灰</p>
          <div class="bd"></div>
        </li>
        <li>
          <p><span>外观颜色:</span>黑 / 灰</p>
          <div class="bd"></div>
        </li>
        <li>
          <p><span>外观颜色:</span>黑 / 灰</p>
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
        <p class="container t600">
          此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,此处为后台上传内容,
        </p>
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
      <btn @click="toxiadan(0)" name="线上下单"></btn>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'carMsg',
  components:{
    btn
  },
  data () {
    return {
      carData: {

      }
    }
  },
  methods:{
    tocanshu(id){
      this.$router.push('/carParam?id=' + id)
    },
    toxiadan(id){
      console.log(id)
      // this.$router.push('/carParam?id=' + id)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '车辆详情')
    console.log(this.id)
  },
  computed:{
    id(){
      return this.$route.query.id
    }
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
        width: 1.653333rem;
        height: .426667rem;
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
</style>
