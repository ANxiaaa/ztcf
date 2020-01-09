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
      console.log(item.name)
      console.log(this.$router)
      this.$router.push('./insurance?carName=' + item.name)
    }
  },
  mounted(){
    this.$store.commit('changeTitle','选择车型')
  }
}
</script>

<style scoped lang="scss">
.insureCarThree{
  height: 100%;
  overflow-y: auto;
}
</style>