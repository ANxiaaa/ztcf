<template>
  <div class="invite">
    <img class="pageBg" :src="require('@/assets/my/invite.png')" alt="">
    <div class="container">
      <h5>我的邀请码：<span>ztkj753</span></h5>
      <div class="inBox">
        <btn :click="click" name="分享链接邀请"></btn>
        <p>面对面扫码邀请</p>
        <img src="" alt="">
      </div>
    </div>
    <van-popup v-model="show" position="bottom">
      <div class="showfx">
        <h6>链接分享至</h6>
        <ul class="fx">
          <li>
            <img src="" alt="">
            <span>微信好友</span>
          </li>
          <li>
            <img src="" alt="">
            <span>朋友圈</span>
          </li>
        </ul>
      </div>
    </van-popup>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'invite',
  components:{
    btn
  },
  data () {
    return {
      show: false
    }
  },
  methods:{
    click(){
      this.show = true
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '个人中心')
  },
  computed:{
  }
}
</script>

<style scoped lang="scss">
.invite{
  height: 100%;
  overflow-y: auto;
  background: #fc7156;
}
.pageBg{
  width: 100%;
  height: 6.4rem;
  position: absolute;
  top: 0;left: 0;
  z-index: 1;
}
.container{
  padding-top: 4.56rem;
  z-index: 8;
  position: relative;
  text-align: center;
  h5{
    color: #F2A561;
    font-size: .426667rem;
    height: 1.173333rem;
    line-height: 1.173333rem;
    background: #fff;
    box-shadow: inset 0 0 .4rem 0 rgba(236,123,96,0.46);
    border-radius: .266667rem;
    span{
      font-size: .48rem;
    }
  }
  .inBox{
    margin-top: .266667rem;
    padding-top: .64rem;
    background: #fff;
    height: 9.373333rem;
    border-radius: .266667rem;
    box-shadow: inset 0 0 .8rem 0 rgba(236,123,96,0.9);
    p{
      font-size: .373333rem;
      color: #EDA08E;
      margin-top: .773333rem;
      margin-bottom: .32rem;
    }
    img{
      background: #000;
      width: 5rem;
      height: 5rem;
      display: block;
      margin: auto;
    }
  }
}
.showfx{
  text-align: center;
  h6{
    font-size: .373333rem;
    color: #999;
    margin-top: .4rem;
  }
  .fx{
    display: flex;
    justify-content: center;
    margin-top: 1rem;
    padding-bottom: .4rem;
    li{
      margin-right: 2.2rem;
      &:last-child{
        margin: 0;
      }
    }
    img{
      height: 1.333333rem;
      width: 1.333333rem;
      background: #000;
      display: block;
    }
    span{
      margin-top: .2rem;
      font-size: .32rem;
      color: #333;
      display: block;
    }
  }
}
</style>