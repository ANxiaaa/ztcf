<template>
  <div class="notice">
    <ul class="container">
      <li>
        <img src="" alt="">
        <div class="notecontent">
          <h6>系统通知</h6>
          <p class="time">2019-10-17 9:31</p>
          <div class="noteBox">
            <span>您好！平台已收到了您的意见反馈，感谢您提出宝贵的意见，我们会认真考虑您的提议，致力把平台做到更好更棒，为你们提供更优质的服务。</span>
            <b>查看提交内容</b>
          </div>
        </div>
      </li>
      <li>
        <img src="" alt="">
        <div class="notecontent">
          <h6>系统通知</h6>
          <p class="time">2019-10-17 9:31</p>
          <div class="noteBox">
            <span>您好！平台已收到了您的意见反馈，感谢您提出宝贵的意见，我们会认真考虑您的提议，致力把平台做到更好更棒，为你们提供更优质的服务。</span>
            <b>查看提交内容</b>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'notice',
  data () {
    return {
    }
  },
  methods:{
  },
  mounted(){
    this.$store.commit('changeTitle', '个人中心')
  },
  computed:{
  }
}
</script>

<style scoped lang="scss">
.notice{
  height: 100%;
  overflow-y: auto;
}
li{
  display: flex;
  justify-content: space-between;
  padding-top: .533333rem;
  img{
    width: .853333rem;
    height: .853333rem;
    background: #000;
    margin-right: .32rem;
  }
  .notecontent{
    flex: 1;
    h6{
      font-size: .426667rem;
      color: #333;
      line-height: 1;
    }
    .time{
      font-size: .346667rem;
      color: #999;
    }
    .noteBox{
      padding: .333333rem;
      background: #F7F7F7;
      border-radius: .053333rem;
      margin-top: .373333rem;
      span{
        font-size: .373333rem;
        color: #666;
      }
      b{
        font-size: .32rem;
        color: #4771E6;
      }
    }
  }
}
</style>