<template>
  <div class="setting">
    <div>
      <!-- <my-title @click="toyanzheng" :data="{name:'更改密码',fs:28,lh:50,fw:500,color:'#333'}"></my-title>
      <div class="bd"></div> -->
      <my-title @click="toshouji" :data="{name:'更改手机号',fs:28,lh:50,fw:500,color:'#333'}"></my-title>
      <div class="bd"></div>
    </div>
    <div class="line"></div>
    <div>
      <van-cell-group class="ts">
        <van-switch-cell v-model="smsSend" title="短信推送" />
      </van-cell-group>
      <div class="bd"></div>
      <van-cell-group class="ts">
        <van-switch-cell v-model="mailSend" title="邮件推送" />
      </van-cell-group>
      <div class="bd"></div>
    </div>
    <btn :style="btnStyle" name="退出账号" @click="exit"></btn>
  </div>
</template>

<script>
import myTitle from '@/components/myTitle'
import btn from '@/components/input/btn'
export default {
  name: 'setting',
  components: {
    myTitle,
    btn
  },
  data () {
    return {
      smsSend: false,
      mailSend: false,
      newSms: false,
      newMail: false,
      btnStyle: {
        position: 'absolute',
        top: `${660 / 75}rem`,
        left: 0,
        right: 0
      }
    }
  },
  methods:{
    exit(){
      this.Dialog.confirm({
        title: '退出',
        message: '确认要退出吗？'
      }).then(() => {
        this.$api.login.logout().then(res=>{
          if(res.code == 200){
            this.Toast.success('退出成功')
            this.$router.go(-1)
          }else{
            this.Toast.success('退出失败')
          }
        })
      })
    },
    toyanzheng(){
      this.$router.push({path: '/findpass',query: { title: '更改密码'}})
    },
    toshouji(){
      this.$router.push({path: '/setpass',query: { title: '更改手机号'}})
    },
  },
  mounted(){
    console.log(this.userData)
    this.smsSend = this.userData.smsSend
    this.mailSend = this.userData.mailSend
    this.newSms = this.userData.smsSend
    this.newMail = this.userData.mailSend
    this.$store.commit('changeTitle','设置')
  },
  computed:{
    userData(){
      return this.$store.getters.userData
    },
  },
  beforeRouteLeave(to,from,next){
    if(this.smsSend == this.newSms && this.mailSend == this.newMail){
      next(true)
      return
    }
    let _this = this
    this.Dialog.confirm({
      closeOnClickOverlay: true,
      confirmButtonText: '保存',
      cancelButtonText: '不保存',
      title: '提示',
      message: '确认要保存修改吗？'
    }).then(() => {
      if(this.smsSend != this.newSms){
        this.$api.user.updateSmsSend().then(res=>{
          console.log('sms')
          if(res.code == 200){
            this.Toast.success('保存成功')
            localStorage.getuser = '1'
            next()
          }else{
            this.Toast.success('保存失败')
          }
        })
      }
      if(this.mailSend != this.newMail){
        console.log('mail')
        this.$api.user.updateMailSend().then(res=>{
          if(res.code == 200){
            this.Toast.success('保存成功')
            localStorage.getuser = '1'
            next()
          }else{
            this.Toast.success('保存失败')
          }
        })
      }
    }).catch(()=>{
      console.log('catch')
      next(true)
    })
    // next(false)
  },
}
</script>

<style scoped>
.ts::after{
  border: none;
}
.ts{
  background: none;
  box-sizing: border-box;
}
.ts >>> .van-cell{
  padding: .32rem;
  font-size: .373333rem;
  background: none;
}
</style>
