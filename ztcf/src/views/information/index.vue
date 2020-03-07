<template>
  <div ref="information" class="information">
    <div></div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div v-for="i in newsList" :key="i.id" @click="toNews(i)" @touchstart="down" @touchend="up" class="newsBox">
        <img :src="i.picurl.split(' ')[0]" alt="">
        <div>
          <p>{{i.title}}</p>
          <span>来源：{{i.description}}</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'information',
  data () {
    return {
      loading: false,
      finished: false,
      pageRequest: {
        "pageNum": 1,
        "pageSize": 20
      },
      pageSize: 0,
      newsList: [],
      scrollTop: 0
    }
  },
  methods: {
    onLoad(){
      console.log('加载')
      this.flag = true
      this.pageRequest.pageNum = ++ this.pageSize
      let pageRequest = this.pageRequest
      this.$api.news.findPage(pageRequest).then(res =>{
        console.log(res)
        this.loading = false
        if(res.data.content.length < this.pageRequest.pageSize){
          this.finished = true
        }
        res.data.content.forEach(i=>{
          console.log(i)
          this.newsList.push(i)
        })
      })
    },
    // 点击反馈
    down(a,b,c){
      a.path.forEach(i=>{
        if(i.className === 'newsBox'){
            i.style.background = '#ececec'
        }
      })
    },
    up(a){
      a.path.forEach(i=>{
        if(i.className === 'newsBox'){
            i.style.background = 'none'
        }
      })
    },
    // 去内容
    toNews(data){
      this.$store.commit('changeNewsData', data)
      this.scrollTop = this.$refs.information.scrollTop
      this.$router.push('/newsContent')
    }
  },
  mounted(){
    
  },
  activated(){
    this.$refs.information.scrollTop = this.scrollTop
  }
}
</script>

<style scoped lang="scss">
.information{
  height: calc(100% - 1.306667rem);
  overflow-y: auto;
}
.newsBox{
  padding: .4rem;
  border-bottom: .013333rem solid #ececec;
  display: flex;
  justify-content: space-between;
  img{
    height: 2rem;
    margin-right: .266667rem;
  }
  div{
    position: relative;
    p{
      font-size: .366667rem;
      color: #333;
    }
    flex: 1;
    span{
      position: absolute;
      bottom: 0;right: 0;
      font-size: .266667rem;
      color: #999;
    }
  }
}
</style>
