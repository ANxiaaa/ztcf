<template>
  <div class="notice">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ul class="container">
        <li v-for="i in list" :key="i.id">
          <img :src="require('@/assets/my/notice.png')" alt="">
          <div class="notecontent">
            <h6>{{i.type.title}}</h6>
            <p class="time">{{timeFormat(i.createTime)}}</p>
            <div class="noteBox">
              <span>{{i.content}}</span>
              <b @click="toMsg(i.conId)" v-if="i.type.value != 1 || i.conId != null">查看提交内容</b>
            </div>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { formatWithSeperator } from '@/utils/datetime'
export default {
  name: 'notice',
  data () {
    return {
      loading: false,
      finished: false,
      pageNum: 0,
      pageRequest: {
        pageNum: 0,
        pageSize: 15
      },
      list: []
    }
  },
  methods:{
    // 查看
    toMsg(conId){
      this.$router.push('/noticeMsg?conId=' + conId)
    },
    // 格式化时间
    timeFormat(time){
      return formatWithSeperator(time, '-', ':')
    },
    // 加载
    onLoad(){
      this.pageNum ++
      this.pageRequest.pageNum = this.pageNum
      this.$api.user.noticefindPage(this.pageRequest).then(res => {
        console.log(res)
        this.loading = false
        res.data.content.forEach(i=>{
          this.list.push(i)
        })
        if(res.data.content.length < this.pageRequest.pageSize){
          this.finished = true
        }
      })
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