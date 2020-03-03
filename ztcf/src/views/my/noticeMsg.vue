<template>
  <div class="noticeMsg">
    <ul class="container">
      <li>
        <p><i></i>反馈时间</p>
        <span>2018年12月12日 12:30:00</span>
      </li>
      <li>
        <p><i></i>联系方式</p>
        <span>12076443526</span>
      </li>
      <li>
        <p><i></i>反馈内容</p>
        <span>此处是用户为平台提供的意见者是问题反馈，为用户能够查看自己的反馈内容，此处是用户为平台提供的意见或者是问题反馈，为用户能够查看自己的反馈内容，此处是用户为平台提供的意见或者是问题反馈，为用户能够查看自己的反馈内容，此处是用户为平台提供的意见或者是问题反馈，为用户能够查看自己的反馈内容，</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'noticeMsg',
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
.noticeMsg{
  height: 100%;
  overflow-y: auto;
}
li{
  padding-left: .4rem;
  p{
    line-height: 1.066667rem;
    font-size: .32rem;
    color: #333;
    position: relative;
    i{
      display: block;
      position: absolute;
      width: .133333rem;
      height: .133333rem;
      border-radius: 50%;
      background: #4771E6;
      top: 0;bottom: 0;
      margin: auto;
      left: -.266667rem;
    }
  }
  span{
    font-size: .373333rem;
    color: #999;
  }
}
</style>