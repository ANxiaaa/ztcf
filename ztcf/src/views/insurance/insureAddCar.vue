<template>
  <div class="insureAddCar">

  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'insurance',
  components:{
    btn
  },
  data () {
    return {

    }
  },
  methods:{

  },
  mounted(){
    this.$store.commit('changeTitle','选择品牌')
  }
}
</script>

<style scoped lang="scss">
.insureAddCar{
  height: 100%;
  overflow-y: auto;
}
</style>