<template>
  <div class="saleArctic">
    <div class="list">
      <leftpic @click="toCarList" :prop="{title: 'name', url: 'logo'}" :data="arcticList"></leftpic>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import leftpic from '@/components/list/leftpic'
export default {
  name: 'saleArctic',
  components:{
    btn,
    leftpic
  },
  data () {
    return {
      arcticList: []
    }
  },
  methods:{
    // 去列表
    toCarList(data){
      console.log(data)
      this.$router.push('/saleCarList?id=' + data.queryId)
    },
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
.saleArctic{
  height: 100%;
  overflow-y: auto;
}
.list{
  margin-top: .3rem;
}
</style>
<style scoped>
>>> p.sale {
  display: none !important;
}
</style>