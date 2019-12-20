<template>
  <div class="insureCarThree">
    <carThree @toMsg="toMsg"></carThree>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import carThree from '@/components/carList/carThree'
import { mapState } from 'vuex'
export default {
  name: 'insureCarThree',
  components:{
    btn,
    carThree
  },
  data () {
    return {
      
    }
  },
  methods:{
    toMsg(item){
      console.log(item)
      let { queryId } = item
      this.$api.carList.allFourCar(queryId).then(res=>{
        if(res.code == 200){
          this.$router.push('/insureCarMsg')
          console.log(res)
        }else{
          this.Toast.fail('获取失败, 请重试!')
        }
      })
    }
  },
  mounted(){
    this.$store.commit('changeTitle','选择车型')
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.insureCarThree{
  height: 100%;
  overflow-y: auto;
}
</style>