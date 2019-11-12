<template>
  <div class="toadvisory">
    
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'toadvisory',
  components:{
  },
  data () {
    return {

    }
  },
  methods:{

  },
  mounted(){
    this.$store.commit('changeTitle','实名认证')
  },
  computed:{
    userData(){
      let data = this.$store.getters.userData
      data.nikeName = '郑泰客服用户'
      data.referralCode = "asd123"
      data.headImg = "https://qlogo2.store.qq.com/qzone/704912509/704912509/100?1564718244"
      return data
    }
  }
}
</script>

<style scoped lang="scss">
.toadvisory{
  height: 100%;
  width: 10rem;
  margin: auto;
}
</style>