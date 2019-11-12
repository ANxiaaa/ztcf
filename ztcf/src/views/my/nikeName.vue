<template>
  <div class="setpass">
    <p class="t600">
      <span class="phone">您当前的昵称为:<span>{{userData.nikeName}}</span></span>
    </p>
    <van-cell-group>
      <van-field clearable v-model="nike" placeholder="请输入昵称" />
      <div class="bd"></div>
    </van-cell-group>
    <btn name="保存" :click="sub"></btn>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'setpass',
  components: {
    btn
  },
  data () {
    return {
      nike: ''
    }
  },
  methods:{
    sub(){
      console.log(this.nike)
    },
  },
  mounted(){
    this.$store.commit('changeTitle','修改昵称')
  },
  computed:{
    userData(){
      let data = this.$store.getters.userData
      return data
    }
  }
}
</script>

<style scoped lang="scss">
p{
  height: 1.28rem;
  line-height: 1.28rem;
  padding: 0 .533333rem;
  font-size: .32rem;
  .phone{
    color: #999;
    span{
      color: #333;
    }
  }
}
.bd{
  margin-bottom: 1.6rem;
}
</style>
<style scoped>
.setpass{
  width: 10rem;
  margin: auto;
}
.van-cell-group::after{
  border: none;
}
</style>
