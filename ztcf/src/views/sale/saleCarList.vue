<template>
  <div class="saleCarList">
    <click-filter @getSend="getSend"></click-filter>
    <div class="list">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="findPage">
        <leftpic @click="click" :data="arcticList" :prop="{title: 'name', url: 'img', sale: 'showCost'}"></leftpic>
      </van-list>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import clickFilter from '@/components/clickFilter'
import leftpic from '@/components/list/leftpic'
import { baseUrl } from '@/utils/global'
export default {
  name: 'saleCarList',
  components:{
    btn,
    clickFilter,
    leftpic
  },
  data () {
    return {
      arcticList: [],
      pageSize: {
        "pageNum": 1,
        "pageSize": 12
      },
      pageNum: 0,
      loading: false,
      finished: false,
      columnFilters: {},
    }
  },
  methods:{
    getSend(a){
      console.log(a)
      let columnFilters = {}
      if(!a.paixu){
        columnFilters = {
          order: {
            name: a.value,
            value: a.active == 1 ? 'desc' : 'asc'
          }
        }
      }
      this.columnFilters = columnFilters
      this.pageNum = 0
      this.arcticList = []
      this.finished = false
      this.loading = true
      this.findPage()
      console.log(columnFilters)
    },
    // 转换小数
    toFiexd2(num){
      console.log(num)
      num = num.toString()
      if(num.indexOf('.') != -1 && (num.slice(num.indexOf('.'))).length > 2){
        return (Number(num)).toFixed(2)
      }else{
        return Number(num)
      }
    },
    click(data){
      console.log(data)
      this.$router.push('/carMsg?id=' + data.id)
    },
    // 获取数据
    findPage(){
      let _this = this;
      let pageRequest;
      this.pageNum ++
      pageRequest = this.pageSize
      pageRequest.pageNum = this.pageNum
      pageRequest.columnFilters = this.columnFilters
      this.$api.sale.findPageByCarInfo(this.id, pageRequest).then(res=>{
        if(res.data.content.length < pageRequest.pageSize)this.finished = true
        res.data.content.forEach(i=>{
          i.img = baseUrl + i.img
          i.rate = _this.toFiexd2((1 - (i.showCost / i.price)) * 100)
          i.showCost = _this.toFiexd2(i.showCost / 10000) + '万'
          i.price = _this.toFiexd2(i.price / 10000) + '万'
        })
        this.arcticList = res.data.content
        this.loading = false
      })
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '选择车型')
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped lang="scss">
.saleCarList{
  height: 100%;
  overflow-y: auto;
}
.list{
  margin-top: .3rem;
}
</style>
<style scoped>
</style>