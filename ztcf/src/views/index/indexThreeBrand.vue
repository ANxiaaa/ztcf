<template>
  <div class="indexThreeBrand">
    <carThree @toMsg="toMsg"></carThree>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import carThree from '@/components/carList/carThree'
import { mapState } from 'vuex'
export default {
  name: 'indexThreeBrand',
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
      // this.$router.push('/indexAddCar?carName=' + item.name)
      this.$router.push({path: '/indexAddCar', query: {
        brandId: this.brandId,
        twoBrandId: this.twoBrandId,
        vehicleId: this.vehicleId,
        carId: item.queryId,
        carName: item.name
      }})
    }
  },
  mounted(){
    this.$store.commit('changeTitle','选择车型')
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
  }
}
</script>

<style scoped lang="scss">
.insureCarThree{
  height: 100%;
  overflow-y: auto;
}
</style>