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
      let path = '/insurance'
      if(this.$route.query.change == 1){
        path = '/vague'
      }
      this.$router.push({path, query: {
        brandId: this.brandId,
        twoBrandId: this.twoBrandId,
        vehicleId: this.vehicleId,
        carId: item.queryId,
        carName: item.name,
        price: Math.round(Number(item.price.slice(0,-1)) * 10000)
      }})
    }
  },
  computed: {
    brandId(){
      return this.$route.query.brandId
    },
    twoBrandId(){
      return this.$route.query.twoBrandId
    },
    vehicleId(){
      return this.$route.query.vehicleId
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