<template>
  <div class="setting">
    <div>
      <my-title :click="toyanzheng" :data="{name:'更改密码',fs:28,lh:50,fw:500,color:'#333'}"></my-title>
      <div class="bd"></div>
      <my-title :click="toshouji" :data="{name:'更改手机号',fs:28,lh:50,fw:500,color:'#333'}"></my-title>
      <div class="bd"></div>
    </div>
    <div class="line"></div>
    <div>
      <van-cell-group class="ts">
        <van-switch-cell v-model="dxts" title="短信推送" />
      </van-cell-group>
      <div class="bd"></div>
      <van-cell-group class="ts">
        <van-switch-cell v-model="yjts" title="邮件推送" />
      </van-cell-group>
      <div class="bd"></div>
    </div>
    <btn :style="btnStyle" name="退出账号" :click="exit"></btn>
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
      dxts: false,
      yjts: false,
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
      
    },
    toyanzheng(){
      this.$router.push({path: '/findpass',query: { title: '更改密码'}})
    },
    toshouji(){
      this.$router.push({path: '/setpass',query: { title: '更改手机号'}})
    }
  },
  mounted(){
    this.$store.commit('changeTitle','设置')
  }
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
