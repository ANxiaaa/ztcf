<template>
  <div class="personal">
    <div class="headImg" @click="gouphead">
      <div class="box">
        <img class="head" :src="baseUrl + userData.headImg" alt="">
      </div>
    </div>
    <div class="mt">
      <goto-list bindtap :click="toNike" name="昵称" :val="userData.nickName"></goto-list>
      <goto-list bindtap :click="toPhone" name="手机号" :val="userData.phone"></goto-list>
      <goto-list bindtap name="邮箱" :val="userData.nickName"></goto-list>
      <goto-list name="推荐码" :val="userData.referralCode"></goto-list>
    </div>
    <div class="line"></div>
    <div class="aa">
      <goto-list bindtap :click="toshiming" name="实名认证" :val="userData.authentication"></goto-list>
      <goto-list bindtap :click="toshouhuo" name="收货地址" :val="userData.city"></goto-list>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gotoList from '@/components/list/gotoList'
import { baseUrl } from '@/utils/global'
export default {
  name: 'personal',
  components:{
    gotoList
  },
  data () {
    return {

    }
  },
  methods:{
    gouphead(){
      this.$router.push('/upHead')
    },
    toPhone(){
      this.$router.push('/setpass?title=更改手机号')
    },
    toNike(){
      this.$router.push('/nickName')
    },
    toshiming(){
      this.$router.push('/authentication')
    },
    toshouhuo(){
      this.$router.push('/addressList')
    }
  },
  mounted(){
    this.$store.commit('changeTitle','个人资料')
  },
  computed:{
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    },
    baseUrl(){
      return baseUrl
    }
  }
}
</script>

<style scoped lang="scss">
.personal{
  padding-top: .773333rem;
  height: 100%;
}
.headImg{
  width: 2.133333rem;
  height: 2.133333rem;
  border: .05rem solid #4771E6;
  margin: auto;
  position: relative;
  border-radius: 50%;
  img{
    display: block;
  }
  .box{
    width: 100%;
    height: 100%;
    border-radius: 50%;
    overflow: hidden;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .crm{
    width: .533333rem;
    height: .533333rem;
    position: absolute;
    right: .186667rem;
    bottom: .013333rem;
  }
}
.mt{
  margin-top: 1.066667rem;
}
</style>