<template>
  <div class="noticeMsg">
    <ul class="container">
      <li>
        <p><i></i>反馈时间</p>
        <span>{{timeFormat(noticeData.createTime)}}</span>
      </li>
      <li>
        <p><i></i>联系方式</p>
        <span>{{noticeData.contact}}</span>
      </li>
      <li>
        <p><i></i>反馈内容</p>
        <span>{{noticeData.content}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatWithSeperator } from '@/utils/datetime'
export default {
  name: 'noticeMsg',
  data () {
    return {
      noticeData: {}
    }
  },
  methods:{
    // 格式化时间
    timeFormat(time){
      return formatWithSeperator(time, '-', ':', 1)
    },
  },
  mounted(){
    this.$store.commit('changeTitle', '个人中心')
    this.$api.user.getSaveConsultation(this.$route.query.conId).then(res=>{
      console.log(res)
      this.noticeData = res.data
    })
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