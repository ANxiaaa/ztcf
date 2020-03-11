<template>
  <div @scroll="onscroll" ref="information" class="information">
    <div class="topNavBar">
      <p @click="changeBar(index)" v-for="(i, index) in navBar" :key="index" :class="{ activeNav: i.active }">{{i.name}}</p>
    </div>
    <div v-show="navBar[0].active" class="shownews">
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
    <div v-if="navBar[1].active" class="showallCar">
      <car-one @toCarTwo="toCarTwo"></car-one>
    </div>
  </div>
</template>

<script>
import carOne from '@/components/carList/carOne'
export default {
  name: 'information',
  components: {
    carOne
  },
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
      scrollTop: 0,
      navBar: [{
        name: '新闻资讯',
        active: true
      },{
        name: '车型大全',
        active: false
      }]
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
    toCarTwo(data){
      console.log(data)
      let params = { parentId: data.id }
      this.$api.carList.allTwoCar(params).then(res=>{
        if(res.code == 200){
          this.$store.commit('changeAllCarTwo',res.data)
          this.$router.push('/indexTwoBrand')
        }else{
          this.Toast.fail('获取失败, 请重试!')
        }
      })
    },
    // 切换
    changeBar(a){
      this.navBar.forEach(i => {
        i.active = false
      })
      this.navBar[a].active = true
    },
    onscroll(a){
      this.scrollTop = this.$refs.information.scrollTop
    },
    // 去内容
    toNews(data){
      this.$api.news.findById(data.id).then(res=>{
        if(res.code == 200){
          this.$store.commit('changeNewsData', data)
          this.$router.push('/newsContent')
        }
      })
    }
  },
  mounted(){
    
  },
  activated(){
    this.$refs.information.scrollTop = this.scrollTop
    if(this.allCar.length){
      console.log('获取车辆1')
    }else{
      console.log('获取车辆2')
      this.$api.carList.allOneCar().then(res=>{
        if(res.code == 200){
          let arr = []
          res.data.forEach(i=>{
              arr.push(i.initial)
          })
          let indexList = [...new Set(arr)].sort()
          this.$store.commit('changeAllCar',res.data)
          this.$store.commit('changeAllIndexList',indexList)
        }else{
          this.Toast.fail('获取失败, 请重试!')
        }
      })
    }
  },
  computed: {
    allCar(){
      let data = this.$store.getters.allCar
      return data
    },
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
.topNavBar{
  height: 1rem;
  display: flex;
  justify-content: space-between;
  text-align: center;
  line-height: 1rem;
  font-size: .35rem;
  p{
    border-bottom: .026667rem solid currentColor;
    flex: 1;border-right: .026667rem #ececec solid;
    color: #ececec;
    &:last-child{
      border-right: none;
    }
    &.activeNav{
      color: #2E6BE6;
      border-bottom-width: .053333rem;
    }
  }
}
</style>
