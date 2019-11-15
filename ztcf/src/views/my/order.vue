<template>
  <div class="order">
    <van-tabs v-model="active" swipeable :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky title-active-color="#4771E6" title-inactive-color="#666">
      <van-tab :to="'/order#' + index" v-for="index in 8" :title="'选项 ' + index" :key="index">
        内容 {{ index }}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'order',
  components:{

  },
  data () {
    return {
      active: 'a'
    }
  },
  methods:{

  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
  }
}
</script>

<style scoped lang="scss">
.order{
  height: 100%;
}
</style>