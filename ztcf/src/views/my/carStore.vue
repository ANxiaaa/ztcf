<template>
  <div class="carStore">

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'addressList',
  components:{
  },
  data () {
    return {
    }
  },
  methods:{
  },
  mounted(){
    this.$store.commit('changeTitle','车库')
  },
  computed:{
    // 用户数据
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    }
  }
}
</script>

<style scoped lang="scss">
.carStore{
  height: 100%;
  overflow-y: auto;
}
</style>