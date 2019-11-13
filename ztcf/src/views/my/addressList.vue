<template>
  <div class="addressList">
    <div class="moren">
      <img :src="require('@/assets/my/address.png')" alt="">
      <p>当前默认地址信息</p>
    </div>
    <address-item></address-item>
    <div class="line"></div>
    <address-item></address-item>
    <address-item></address-item>
    <address-item></address-item>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import addressItem from '@/components/list/addressItem'
export default {
  name: 'addressList',
  components:{
    addressItem
  },
  data () {
    return {
    }
  },
  methods:{
  },
  mounted(){
    this.$store.commit('changeTitle','收货地址')
  },
  computed:{
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    }
  }
}
</script>

<style scoped lang="scss">
.addressList{
  height: 100%;
}
.moren{
  display: flex;
  justify-content: flex-start;
  padding: .453333rem .32rem 0;
  align-items: center;
  img{
    height: .4rem;
    width: .4rem;
    margin-right: .16rem;
  }
}
</style>