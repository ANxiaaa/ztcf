<template>
  <div class="authentication">
    <goto-list input name="姓名" placeholder="请输入您的真实姓名"></goto-list>
    <goto-list name="手机号" :val="userData.phone"></goto-list>
    <goto-list input name="证件号" placeholder="请输入您的证件号"></goto-list>
    <div class="t600 sfz">
        <b>证件照片:</b>
        <div>
          <img :src="require('@/assets/my/zhengmian.png')" alt="">
          <input @change="changeImg" type="file" accept="image/*" capture="camera">
        </div>
        <p>人像面</p>
        <div>
          <img :src="require('@/assets/my/beimian.png')" alt="">
          <input type="file" accept="image/*" capture="camera">
        </div>
        <p>国徽面</p>
      <btn name="保存"></btn>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gotoList from '@/components/list/gotoList'
import btn from '@/components/input/btn'
export default {
  name: 'authentication',
  components:{
    gotoList,
    btn
  },
  data () {
    return {

    }
  },
  methods:{
    changeImg(a){
      console.log(a)
    }
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
.authentication{
  height: 100%;
}
.t600{
  line-height: 1.44rem;
  padding: 0 .426667rem;
  font-weight: 500;
  b{
    font-size: .4rem;
    color: #999;
    width: 1.866667rem;
  }
}
.sfz{
  padding-bottom: .32rem;
  div{
    margin: auto;
    position: relative;
    width: 8.533333rem;
    height: 5.373333rem;
    img{
      height: 100%;
      width: 100%;
      display: block;
    }
    input{
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      // top: 0;right: 0;left: 0;bottom: 0;
      opacity: 0;
    }
  }
  p{
    font-size:.373333rem;
    font-family:PingFang SC;
    font-weight:500;
    color: #333333;
    text-align: center;
    margin-bottom: .4rem;
  }
}
</style>