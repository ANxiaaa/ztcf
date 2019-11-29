<template>
  <div class="insureAddCar">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <car-one></car-one>
    </van-list>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import carOne from '@/components/carList/carOne'
import { mapState } from 'vuex'
export default {
  name: 'insureAddCar',
  components:{
    btn,
    carOne
  },
  data () {
    return {
      indexList: [],
      loading: false,
      finished: false
    }
  },
  methods:{
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.loading = false
        this.finished = true
      }, 0);
    }
  },
  mounted(){
    console.log(this.allCar)
    this.$store.commit('changeTitle','选择品牌')
  },
  computed: {
    allCar(){
      return this.$store.getters.allCar
    }
  }
}
</script>

<style scoped lang="scss">
.insureAddCar{
  height: 100%;
  overflow-y: auto;
}
</style>