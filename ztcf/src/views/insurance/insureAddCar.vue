<template>
  <div class="insureAddCar">
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <car-one @toCarTwo="toCarTwo"></car-one>
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
      // 是否加载
      loading: false,
      // 是否成功
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
    },
    // 跳转选择车系
    toCarTwo(data){
      console.log(data)
      let params = { parentId: data.id }
      this.$api.carList.allTwoCar(params).then(res=>{
        if(res.code == 200){
          this.$store.commit('changeAllCarTwo',res.data)
          if(this.$route.query.change == 1){
            this.$router.push('/insureCarTwo?change=1&brandId=' + data.id)
          }else{
            this.$router.push('/insureCarTwo?brandId=' + data.id)
          }
        }else{
          this.Toast.fail('获取失败, 请重试!')
        }
      })
    }
  },
  mounted(){
    this.$store.commit('changeTitle','选择品牌')
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">
.insureAddCar{
  height: 100%;
  overflow-y: auto;
}
</style>