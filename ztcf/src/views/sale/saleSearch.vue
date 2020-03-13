<template>
  <div :class="{ oh }" class="saleSearch">
    <form v-if="isSearch" action="/">
      <van-search @click.native="inS" @search="search" placeholder="车辆名称或品牌" v-model="searchData" shape="round"/>
    </form>
    <div class="showHist" v-show="isSearch && showHist">
      <van-cell clickable v-for="(i, index) in searchHistory" @click.stop="search(i)" :title="i" :key="index"></van-cell>
        <van-icon @click.stop="delHist(index)" slot="right-icon" name="cross" style="line-height: inherit;" />
      </van-cell>
    </div>
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
      columnFilters: {},
      filter1: {},
      filter2: {},
      carnameFilter: {},
      searchHistory: [],
      showHist: true
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
        this.columnFilters = Object.assign(this.filter1, filter)
      }else{
        this.columnFilters = {}
      }
      this.filter1 = this.columnFilters
      this.searchList = []
      this.finished = false
      this.loading = true
      this.pageNum = 0
      this.columnFilters = Object.assign({},this.carnameFilter)
      this.pageRequest.columnFilters = Object.assign({}, this.columnFilters)
      this.onLoad()
    },
    // 筛选条件
    getFilter(data){
      let flag = true;
      console.log(data)
      let filter = {}
      for(let i in data){
        console.log(i)
        if(i == 'pl'){
          console.log(data[i])
          filter[i] = {
            name: data[i].split(',')[0],
            value: data[i].split(',')[1]
          }
        }else{
          filter[i] = {
            name: '',
            value: data[i]
          }
        }
      }
      console.log(filter)
      this.searchList = []
      this.finished = false
      this.loading = true
      this.pageNum = 0
      this.pageRequest.columnFilters = Object.assign(filter, this.filter1)
      this.onLoad()
    },
    // 阴影
    getOh(a){
      this.oh = a
    },
    // 搜索
    search(value){
      console.log(value)
      let columnFilters = {
        carname: {
          name: '',
          value
        }
      }
      this.carnameFilter = columnFilters
      // 回复初始搜索页数
      this.pageNum = 0
      this.showRes = true
      this.searchList = []
      this.loading = true
      this.finished = false
      this.pageRequest.columnFilters = Object.assign({}, this.carnameFilter)
      this.showHist = false
      this.addHist(value)
      this.onLoad()
    },
    inS(){
      console.log('dianji')
      this.showRes = false;
      this.showHist = true
    },
    // 添加搜索记录
    addHist(value){
      console.log('添加搜索')
      for(let i = 0;i < this.searchHistory.length; i ++){
        if(this.searchHistory[i] == value){
          return
        }
      }
      console.log('添加')
      if(this.searchHistory.length >= 5){
        this.searchHistory.pop()
      }
      this.searchHistory.unshift(value)
      localStorage.searchHistory = this.searchHistory
      console.log(this.searchHistory)
    },
    // 删除搜索记录
    delHist(index){
      console.log('删除搜索')
      this.searchHistory.splice(index, 1)
      localStorage.searchHistory = this.searchHistory
    },
    // 加载
    onLoad(){
      this.morePage()
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
      pageRequest = Object.assign(pageRequest,this.carnameFilter)
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
    if(localStorage.searchHistory != undefined){
      console.log(localStorage.searchHistory)
      this.searchHistory = localStorage.searchHistory.split(',')
    }else{
      this.searchHistory = []
    }
    console.log(this.searchHistory)
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
.searchHist{
  display: flex;
  height: .533333rem;
  justify-content: space-between;
  align-items: center;
}
</style>
