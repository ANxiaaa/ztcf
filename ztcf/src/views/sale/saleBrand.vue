<template>
  <div class="saleBrand">
    <van-index-bar :index-list="indexList" :sticky="false" highlight-color="#2E6BE6">
      <div v-for="(i, index) in brandList" :key="index" :index="i.id">
        <van-index-anchor class="listTop t600"><p class="container">{{i.name}}</p></van-index-anchor>
        <ul class="list">
          <li @touchstart="down" @touchend="up" v-for="(a, idx) in i.list" :key="idx" @click="toxinghao(a.queryId)">
            <div class="container t600">
              <img :src="a.logo" alt="">
              <div>
                <p>{{a.fullname}}</p>
                <span>{{toFiexd2(i.minp / 10000)}}-{{toFiexd2(i.maxp / 10000)}}万</span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'saleBrand',
  components:{
    btn
  },
  data () {
    return {
      // 索引
      indexList: [],
      // 车系列表
      brandList: []
    }
  },
  methods:{
    // 点击反馈
    down(a){
      a.path.forEach(i=>{
        if(i.tagName === 'LI'){
            i.style.background = '#ececec'
        }
      })
    },
    up(a){
      a.path.forEach(i=>{
        if(i.tagName === 'LI'){
            i.style.background = 'none'
        }
      })
    },
    toxinghao(id){
      this.$router.push('/saleArctic?parentId=' + id)
    },
    // 转换小数
    toFiexd2(num){
      num = num.toString()
      if(num.indexOf('.') != -1 && (num.slice(num.indexOf('.'))).length > 2){
        return (Number(num)).toFixed(2)
      }else{
        return Number(num)
      }
    },
  },
  mounted(){
    this.$store.commit('changeTitle', '选择车系')
    console.log(this.$route.query.id)
    this.$api.sale.findTwoBrand(this.$route.query.id).then(res=>{
      this.brandList = res.data
      let indexList = res.data.map(i=>i.id)
      this.indexList = [...new Set(indexList)].sort()
      // this.$nextTick()
    })
    .then(()=>{
      this.brandList.forEach(i=>{
        this.$api.sale.findThreeBrand(i.id).then(threeRes=>{
          i.list = threeRes.data
        })
      })
    })
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped lang="scss">
.saleBrand{
  height: 100%;
  overflow-y: auto;
}
.listTop{
  background: #F2F4F7;
}
.list{
  overflow: hidden;
  li{
    padding: .32rem 0;
    border-bottom: .026667rem solid #F2F4F7;
    .t600{
      height: 2.4rem;
      display: flex;
      font-weight: 500;
      div{
        flex: 1;
        line-height: 1;
        margin-left: .32rem;
      }
      img{
        height: 100%;
        width: 3.2rem;
        display: block;
      }
      p{
        font-size:.426667rem;
        color: #333333;
        margin-top: .613333rem;
        margin-bottom: .4rem;
      }
      span{
        color: #E56245;
        font-size: .373333rem;
      }
    }
  }
}
</style>
<style scoped>
.listTop >>> .van-index-anchor{
  font-size: .373333rem;
  font-weight: 500;
  color: #666;
  line-height: 1.7
}
>>> .van-index-bar__sidebar{
  display: none;
}
</style>