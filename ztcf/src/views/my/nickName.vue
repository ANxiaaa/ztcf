<template>
  <div class="setpass">
    <p class="t600">
      <span class="phone">您当前的昵称为:<span>{{userData.nickName}}</span></span>
    </p>
    <van-cell-group>
      <van-field clearable v-model="nike" placeholder="请输入昵称" />
      <div class="bd"></div>
    </van-cell-group>
    <btn name="保存" @click="sub"></btn>
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
    // 提交
    sub(){
      console.log(this.nike)
      if(!this.nike){
        this.Toast.fail('昵称不能为空')
        return
      }
      if(!/^[\u4e00-\u9fa5A-Za-z0-9-_]*$/.test(this.nike)){
        this.Toast.fail('不能包含特殊字符')
        return
      }
      this.$api.user.updateNickName(this.nike).then(res=>{
        if(res.code === 200){
          this.$router.go(-1)
          localStorage.getuser = '1'
          this.Toast('修改成功')
        }
      })
    },
  },
  mounted(){
    this.$store.commit('changeTitle','修改昵称')
  },
  computed:{
    // 用户信息
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
