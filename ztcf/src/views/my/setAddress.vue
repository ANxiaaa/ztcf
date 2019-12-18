<template>
  <div class="setAddress t600">
    <p v-if="!add">您当前还没有添加收货地址</p>
    <goto-list input name="姓名" placeholder="请输入收货人姓名"></goto-list>
    <goto-list input name="手机号" placeholder="请输入有效手机号"></goto-list>
    <goto-list input name="选择地区" placeholder="请选择您的省/市/区"></goto-list>
    <goto-list input name="详细地址" placeholder="请选择您的街区/小区/楼层"></goto-list>
    <div v-if="add">
      <div class="line"></div>
      <van-cell-group class="ts">
        <van-switch-cell title-class="moren" v-model="moren" title="设为默认地址" />
      </van-cell-group>
      <div class="line"></div>
      <van-cell-group class="ts">
        <van-cell title-class="del" clickable title="删除收货地址"/>
      </van-cell-group>
      <div class="bd"></div>
    </div>
    <btn :style="btnStyle" @click="sub" name="保存"></btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gotoList from '@/components/list/gotoList'
import btn from '@/components/input/btn'
export default {
  name: 'setAddress',
  components:{
    gotoList,
    btn
  },
  data () {
    return {
      // 地址
      add: true,
      // 默认
      moren: false,
      // 按钮样式
      btnStyle: {
        position: 'absolute',
        top: `${910 / 75}rem`,
        left: 0,
        right: 0
      }
    }
  },
  methods:{
    // 提交
    sub(){
      console.log(1)
    }
  },
  mounted(){
    this.$store.commit('changeTitle','收货地址')
  },
  computed:{
    // 用户信息
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    }
  }
}
</script>

<style scoped lang="scss">
.setAddress{
  height: 100%;
  font-weight: 500;
}
p{
  font-size:.32rem;
  padding: .533333rem .4rem;
  color: #999999;
}
.del{
  color: #E55545;
  font-size:.32rem;
}
.moren{
  color: #333333;
  font-size:.32rem;
}
</style>