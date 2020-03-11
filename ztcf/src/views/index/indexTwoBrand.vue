<template>
  <div class="indexTwoBrand">
    <carTwo @toCarThree="toCarThree"></carTwo>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import carTwo from '@/components/carList/carTwo'
import { mapState } from 'vuex'
export default {
  name: 'indexTwoBrand',
  components:{
    btn,
    carTwo
  },
  data () {
    return {
      
    }
  },
  methods:{
    // 跳转三级车型
    toCarThree(data){
      console.log(data)
      let params = { parentId: data.queryId }
      this.$api.carList.allThreeCar(params).then(res=>{
        if(res.code == 200){
          console.log(this.brandId)
          this.$store.commit('changeAllCarThree',res.data.list)
          if(this.brandId){
            this.$router.push({path: '/indexThreeBrand', query: {
              brandId: this.brandId,
              twoBrandId: data.parentId,
              vehicleId: data.queryId
            }})
          }else{
            this.$router.push('/indexThreeBrand')
          }
        }else{
          this.Toast.fail('获取失败, 请重试!')
        }
      })
    }
  },
  mounted(){
    this.$store.commit('changeTitle','选择车系')
  },
  computed: {
    brandId(){
      return this.$route.query.brandId
    }
  }
}
</script>

<style scoped lang="scss">
.insureCarTwo{
  height: 100%;
  overflow-y: auto;
}
</style>