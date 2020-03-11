<template>
  <div class="browsing">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ul>
        <li class="container" v-for="i in list" :key="i.id">
          <img :src="i.picture" alt="">
          <div class="bwright">
            <p>{{i.titl}}</p>
          </div>
        </li>
      </ul>
    </van-list>
  </div>
</template>

<script>
import { baseUrl } from '@/utils/global'
export default {
  name: 'browsing',
  data () {
    return {
      loading: false,
      finished: false,
      pageNum: 0,
      pageRequest: {
        pageNum: 0,
        pageSize: 15
      },
      list: [],
      baseUrl
    }
  },
  methods:{
    // 查看
    toMsg(conId){
      this.$router.push('/noticeMsg?conId=' + conId)
    },
    // 加载
    onLoad(){
      this.pageNum ++
      this.pageRequest.pageNum = this.pageNum
      this.$api.user.memberFindPage(this.pageRequest).then(res => {
        console.log(res)
        this.loading = false
        res.data.content.reverse()
        res.data.content.forEach(i=>{
          if(i.type == 1){
            i.picture = baseUrl + i.picture
          }else if(i.type == 2){
            i.picture = i.picture.split(' ')[0]
          }
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
.browsing{
  height: 100%;
  overflow-y: auto;
}
li{
  display: flex;
  justify-content: space-between;
  padding: .4rem 0;
  img{
    width: 3.706667rem;
    height: 2.666667rem;
    margin-right: .32rem;
  }
  .bwright{
    flex: 1;

  }
}
</style>