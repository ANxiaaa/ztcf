<template>
  <div class="insureCarTwo">
    <carTwo @toCarThree="toCarThree"></carTwo>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import carTwo from '@/components/carList/carTwo'
import { mapState } from 'vuex'
export default {
  name: 'insureCarTwo',
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
      console.log(params)
      this.$api.carList.allThreeCar(params).then(res=>{
        console.log(res.data.list)
        if(res.code == 200){
          this.$store.commit('changeAllCarThree',res.data.list)
          this.$router.push('/insureCarThree')
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
  }
}
</script>

<style scoped lang="scss">
.insureCarTwo{
  height: 100%;
  overflow-y: auto;
}
</style>