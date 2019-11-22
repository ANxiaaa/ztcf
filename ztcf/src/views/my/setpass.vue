<template>
  <div class="setpass">
    <p class="t600">
      <span v-if="!changePhone" class="phone">您当前登录的账号为:<span>{{userData.phone}}</span></span>
      <span v-else class="changePhone">更换手机号后, 需要重新进行身份验证</span>
    </p>
    <div v-if="!changePhone">
      <van-cell-group v-if="!userData">
        <van-field
          :border="false"
          label-class="inputName t600"
          type="password"
          v-model="oldPass"
          label="旧密码:"
          placeholder="请输入旧密码"
        />
        <div class="bd"></div>
      </van-cell-group>
      <van-cell-group>
        <van-field
          :border="false"
          label-class="inputName t600"
          type="password"
          v-model="newPass"
          label="新密码:"
          placeholder="请输入您的密码"
        />
        <div class="bd"></div>
      </van-cell-group>
      <van-cell-group>
        <van-field
          :border="false"
          label-class="inputName t600"
          type="password"
          v-model="againPass"
          label="确认密码:"
          placeholder="请再次输入您的密码"
        />
        <div class="bd"></div>
      </van-cell-group>
    </div>
    <div v-else>
      <van-cell-group>
        <van-field v-if="userData"
          :border="false"
          label-class="inputName t600"
          v-model="oldPhone"
          label="初始手机号:"
          placeholder="请输入您的初始手机号"
        />
        <div class="bd"></div>
      </van-cell-group>
      <van-cell-group>
        <van-field v-if="userData"
          :border="false"
          label-class="inputName t600"
          v-model="newPhone"
          label="新手机号:"
          @input="jc"
          placeholder="请输入您的新手机号"
        />
        <span class="jiance">{{jcphone}}</span>
        <div class="bd"></div>
      </van-cell-group>
      <van-cell-group>
        <van-field v-if="userData"
          :border="false"
          label-class="inputName t600"
          v-model="yzm"
          label="验证码:"
          placeholder="请输入您收到的验证码"
        />
        <yanzhengma v-if="repeat" :old-phone="oldPhone" :phone="newPhone" style="position: absolute;right: .4rem;top: 0;bottom: 0;margin: auto;border: none;"></yanzhengma>
        <div class="bd"></div>
      </van-cell-group>
    </div>
    <btn :disabled="yzm.length != 6 || userData.phone != oldPhone" :style="btnStyle" name="确认修改" @click="sub"></btn>
  </div>
</template>

<script>
import myTitle from '@/components/myTitle'
import btn from '@/components/input/btn'
import yanzhengma from '@/components/input/yanzhengma'
export default {
  name: 'setpass',
  components: {
    myTitle,
    btn,
    yanzhengma
  },
  data () {
    return {
      dxts: false,
      yjts: false,
      time: null,
      btnStyle: {
        position: 'absolute',
        top: `${660 / 75}rem`,
        left: 0,
        right: 0
      },
      oldPass: '',
      newPass: '',
      againPass: '',
      changePhone: false,
      oldPhone: '',
      newPhone: '',
      yzm: '',
      jcphone: '',
      repeat: false
    }
  },
  methods:{
    sub(){
      if(!this.changePhone){
        if(this.newPass === '' || this.againPass === '' || this.oldPass === ''){
            this.Toast.fail('请输入密码!')
        }else if(!/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@&%#_]{8,16}$/.exec(this.againPass)){
            this.Toast({
                message: '必须包含一个大写，一个小写字母，且长度为8到16位!',
                duration: 2000
            })
        }else if(this.newPass != this.againPass){
            this.Toast.fail('两次密码输入不一致!')
        }else{
            console.log(this.newPass)
            console.log(this.pass)
        }
      }else{
        if(!/^1[3456789]\d{9}$/.test(this.newPhone)){
          this.Toast.fail('请输入正确的新手机号')
          return
        }
        if(this.repeat && this.userData.phone == this.oldPhone){
          let data = {
            phone: this.oldPhone,
            newPhone: this.newPhone,
            sendCode: this.yzm
          }
          console.log(data)
          this.$api.user.updatePhone(data).then(res=>{
            console.log(res)
            if(res.code == 200){
              localStorage.removeItem('isLogin')
              this.$router.push('/my')
              this.Toast('修改成功请重新登录!')
            }
          })
        }
      }
    },
    jc(a){
      clearTimeout(this.time)
      this.jcphone = ''
      this.repeat = false
      if(a.length === 11){
        console.log(a)
        this.time = setTimeout(() => {
          this.$api.user.checkPhoneExist(this.newPhone).then(res=>{
            if(res.code === 200){
              this.jcphone = '手机号未占用'
              this.repeat = true
            }else{
              this.jcphone = res.msg
            }
          })
        }, 100);
      }
    }
  },
  mounted(){
    let title
    // if(this.userData){
    //   this.$store.commit('changeTitle','修改密码')
    // }else{
      title = this.$route.query.title
      this.$store.commit('changeTitle',title)
    // }
    switch (title){
      case '更改手机号':
        this.changePhone = true
    }
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
  .changePhone{
    color: #D95A41
  }
}
.jiance{
  position: absolute;
  top: 0;
  bottom: 0;
  right: .8rem;
  height: .4rem;
  margin: auto;
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
>>> .inputName{
  color: #999;
  position: relative
}
</style>
