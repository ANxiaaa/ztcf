<template>
  <div class="carMsg">
    <img :src="require('@/assets/sale/goods.png')" alt="" class="top">
    <div class="msg t600">
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'carMsg',
  components:{

  },
  data () {
    return {

    }
  },
  methods:{

  },
  mounted(){
    this.$store.commit('changeTitle', '车辆详情')
    console.log(this.id)
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped lang="scss">
.carMsg{
  background: #F2F4F7;
  overflow-y: auto;
  height: 100%;
  img.top{
    width: 7.413333rem;
    height: 3.893333rem;
    margin: 1.813333rem auto 0;
    display: block;
  }
}
.msg{
  width: 10rem;
  margin: auto;
  margin-top: .8rem;
  border-radius:.8rem .8rem 0 0;
  background: #fff;
  padding: .533333rem .4rem;
  font-weight: 500;
}
</style>
