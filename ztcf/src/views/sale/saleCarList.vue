<template>
  <div class="saleCarList">
    <click-filter @getSend="getSend"></click-filter>
    <div class="list">
      <leftpic @click="click" :data="arcticList" :prop="{title: 'name', url: 'img', sale: 'showCost'}"></leftpic>
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
      }
    }
  },
  methods:{
    getSend(a){
      console.log(a)
    },
    // 转换小数
    toFiexd2(num){
      num = num.toString()
      if(num.indexOf('.') != -1 && (num.substring(num.indexOf('.'), num.length)).length > 1){
        return (Number(num)).toFixed(1)
      }else{
        return Number(num)
      }
    },
    click(data){
      console.log(data)
      this.$router.push('/carMsg?id=' + data.id)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '选择车型')
    let _this = this;
    this.$api.sale.findPageByCarInfo(this.id, this.pageSize).then(res=>{
      res.data.content.forEach(i=>{
        i.img = baseUrl + i.img
        i.rate = _this.toFiexd2((1 - (i.showCost / i.price)) * 100)
        i.showCost = _this.toFiexd2(i.showCost / 10000) + '万'
        i.price = _this.toFiexd2(i.price / 10000) + '万'
      })
      this.arcticList = res.data.content
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