<template>
  <div :class="{ oh }" class="saleSearch">
    <form v-if="isSearch" action="/">
      <van-search @search="search" placeholder="品牌/车型/车系" v-model="searchData" shape="round"/>
    </form>
    <search-filter @getFilter="getFilter" @getVal="getVal" @getOh="getOh" v-show="!isSearch || showRes"></search-filter>
    <div v-if="!isSearch || showRes" class="container list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <leftpic :data="searchList" :prop="{title: 'name',url: 'img',sale: 'showCost'}"></leftpic>
      </van-list>
    </div>
  </div>
</template>

<script>
import searchFilter from '@/components/filter'
import leftpic from '@/components/list/leftpic'
import { baseUrl } from '@/utils/global'
export default {
  name: 'saleSearch',
  components:{
    searchFilter,
    leftpic
  },
  data () {
    return {
      searchData: '',
      loading: false,
      finished: false,
      showRes: false,
      searchList: [],
      oh: false,
      pageRequest: {
        "pageNum": 1,
        "pageSize": 10
      },
      pageNum: 0,
      columnFilters: {}
    }
  },
  methods:{
    // 筛选值
    getVal(data){
      console.log(data)
      if(data.val){
        let filter = {}
        if(data.type == 'order' || data.type == 'showCost'){
          filter[data.type] = {
            name: data.val.split(',')[0],
            value: data.val.split(',')[1]
          }
        }
        if(data.type == 'sizetype'){
          filter[data.type] = {
            name: '',
            value: data.text
          }
        }
        this.columnFilters = Object.assign({}, filter)
      }else{
        this.columnFilters = {}
      }
      this.searchList = []
      this.finished = false
      this.loading = true
      this.pageNum = 0
      this.pageRequest.columnFilters = Object.assign({}, this.columnFilters)
      this.onLoad()
    },
    // 筛选条件
    getFilter(data){
      console.log(data)
    },
    // 阴影
    getOh(a){
      this.oh = a
    },
    // 搜索
    search(val){
      console.log(val)
      // 回复初始搜索页数
      this.showRes = true
    },
    // 加载
    onLoad(){
      let _this = this
      if(this.isSearch){ // 搜索接口
        setTimeout(()=>{
          let data = []
          data.forEach(i=>{
            _this.searchList.push(i)
          })
          this.loading = false;
          console.log(_this.searchList.length)
        },2000)
        // 加载完毕
        // if(_this.searchList.length > 30){
        //   _this.finished = true;
        // }
      }else{ // 更多特价车接口
        _this.morePage()
      }
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
    // 更多分页查询
    morePage(){
      this.pageRequest.pageNum = ++ this.pageNum
      let pageRequest = this.pageRequest
      console.log(pageRequest)
      this.$api.sale.findPage(pageRequest).then(res=>{
        console.log(res)
        this.loading = false
        if(res.data.data.content.length < pageRequest.pageSize){
          this.finished = true
        }
        res.data.data.content.forEach(i=>{
          i.img = baseUrl + i.img
          i.rate = this.toFiexd2((1 - (i.showCost / i.price)) * 100)
          i.showCost = this.toFiexd2(i.showCost / 10000) + '万'
          i.price = this.toFiexd2(i.price / 10000) + '万'
          this.searchList.push(i)
        })
      })
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '特价车')
  },
  computed:{
    isSearch(){
      return this.$route.query.title === '搜索'
    }
  }
}
</script>

<style scoped lang="scss">
.saleSearch{
  height: 100%;
  overflow-y: auto;
}
.list{
  margin-top: .3rem;
}
.oh{
  overflow: hidden !important;
}
</style>
