<template>
  <div class="insureCarThree">
    <carThree></carThree>
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