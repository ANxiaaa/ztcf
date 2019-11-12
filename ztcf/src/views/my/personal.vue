<template>
  <div class="personal">
    <div class="headImg" @click="changeImg">
      <div class="box">
        <img class="head" :src="userData.headImg" alt="">
      </div>
      <img class="crm" :src="require('@/assets/htx.png')" alt="">
    </div>
    <div class="mt">
      <goto-list bindtap :click="toNike" name="昵称" :val="userData.nikeName"></goto-list>
      <goto-list bindtap :click="toPhone" name="手机号" :val="userData.phone"></goto-list>
      <goto-list bindtap name="邮箱" :val="userData.nikeName"></goto-list>
      <goto-list name="推荐码" :val="userData.referralCode"></goto-list>
    </div>
    <div class="line"></div>
    <div class="aa">
      <goto-list bindtap :click="toshiming" name="实名认证" :val="userData.authentication"></goto-list>
      <goto-list bindtap :click="toshouhuo" name="收货地址" :val="userData.city"></goto-list>
    </div>
    <van-action-sheet
      @select="selectClick"
      v-model="show"
      :actions="actions"
      cancel-text="取消"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gotoList from '@/components/list/gotoList'
export default {
  name: 'personal',
  components:{
    gotoList
  },
  data () {
    return {
      show: false,
      actions: [
        { name: '拍照' },
        { name: '从相册中选择' }
      ]
    }
  },
  methods:{
    selectClick(item, index){
      console.log(item, index)
    },
    changeImg(){
      this.show = true;
    },
    onCancel() {
      this.show = false;
    },
    toPhone(){
      this.$router.push('/setpass?title=更改手机号')
    },
    toNike(){
      this.$router.push('/nikeName')
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
      data.nikeName = '郑泰客服用户'
      data.referralCode = "asd123"
      data.headImg = "https://qlogo2.store.qq.com/qzone/704912509/704912509/100?1564718244"
      return data
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