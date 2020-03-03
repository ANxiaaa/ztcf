<template>
  <div class="addressList">
    <div class="loading" v-if="loading">
      <van-loading color="#1989fa">加载中...</van-loading>
    </div>
    <div v-else>
      <div v-if="noAddress" class="notPage">
        <img :src="require('@/assets/noAddress.png')" alt="">
        <p>暂无地址</p>
      </div>
      <div v-else>
        <div class="moren">
          <img :src="require('@/assets/my/address.png')" alt="">
          <p>当前默认地址信息</p>
        </div>
        <address-item :addData="defAdd[0]" @click="curAddress(defAdd[0].id)"></address-item>
        <div class="line"></div>
        <address-item @click="curAddress(i.id)" v-for="i in addList" :key="i.id" :addData="i"></address-item>
      </div>
      <div class="bottom">
        <btn @click="setAddress" name="添加地址"></btn>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import addressItem from '@/components/list/addressItem'
import btn from '@/components/input/btn'
export default {
  name: 'addressList',
  components:{
    addressItem,
    btn
  },
  data () {
    return {
      loading: true,
      noAddress: true,
      defAdd: [],
      addList: []
    }
  },
  methods:{
    // 选择地址
    curAddress(id){
      let pathFrom = this.$route.query.from
      if(pathFrom){
        this.$store.commit('changeOrderAddress', {id, pathFrom})
        this.$router.go(-1)
      }
    },
    // 添加地址
    setAddress(){
      if(this.noAddress){
        this.$router.push('/setAddress?not=1')
      }else{
        this.$router.push('/setAddress')
      }
    }
  },
  mounted(){
    this.$store.commit('changeTitle','收货地址')
    this.$api.user.getReceipts().then(res => {
      this.loading = false
      if(res.data.length){
        this.noAddress = false
        this.defAdd = res.data.filter(i=>i.def == 1)
        this.addList = res.data.filter(i=>i.def == 0)
        console.log(res)
        console.log(this.defAdd)
        console.log(this.addList)
      }
    })
  },
  computed:{
    // 用户数据
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
.loading{
  text-align: center;
  line-height: 3rem;
}
.bottom{
  position: absolute;
  bottom: 0;left: 0;right: 0;
  padding: .4rem 0;
  background: #fff;
}
</style>