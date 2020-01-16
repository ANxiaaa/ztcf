<template>
  <div class="saleCarList">
    <click-filter @getSend="getSend"></click-filter>
    <div class="list container">
      <leftpic :data="arcticList"></leftpic>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import clickFilter from '@/components/clickFilter'
import leftpic from '@/components/list/leftpic'
export default {
  name: 'saleCarList',
  components:{
    btn,
    clickFilter,
    leftpic
  },
  data () {
    return {
      arcticList: []
    }
  },
  methods:{
    getSend(a){
      console.log(a)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '选择车型')
    console.log(this.parentId)
    this.$api.sale.findFourBrand(this.parentId).then(res=>{
      console.log(res)
      this.arcticList = res.data
      this.arcticList.forEach(i=>{
        i.label = [i.sizetype, i.productionstate]
      })
    })
  },
  computed:{
    parentId(){
      return this.$route.query.parentId
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