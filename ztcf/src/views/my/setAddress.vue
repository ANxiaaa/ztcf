<template>
  <div class="setAddress t600">
    <p v-if="!add">您当前还没有添加收货地址</p>
    <goto-list input name="姓名" v-model="address.name" placeholder="请输入收货人姓名"></goto-list>
    <goto-list input name="手机号" v-model="address.phone" placeholder="请输入有效手机号"></goto-list>
    <goto-list v-model="showCity" @click="showArea" name="选择地区" placeholder="请选择您的省/市/区"></goto-list>
    <goto-list input name="详细地址" v-model="address.address" placeholder="请输入您的街区/小区/楼层"></goto-list>
    <div v-if="add">
      <div class="line"></div>
      <van-cell-group class="ts">
        <van-switch-cell title-class="moren" v-model="moren" title="设为默认地址" />
      </van-cell-group>
      <div v-show="showdel">
        <div class="line"></div>
        <van-cell-group class="ts">
          <van-cell @click="deleltAdd" title-class="del" clickable title="删除收货地址"/>
        </van-cell-group>
      </div>
      <div class="bd"></div>
    </div>
    <van-popup v-model="show" position="bottom">
      <van-area @confirm="areaChange" :area-list="areaList"/>
    </van-popup>
    <btn :style="btnStyle" @click="sub" name="保存"></btn>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import gotoList from '@/components/list/gotoList'
import btn from '@/components/input/btn'
import areaList from '@/utils/area'
export default {
  name: 'setAddress',
  components:{
    gotoList,
    btn
  },
  data () {
    return {
      // 弹出层
      show: false,
      // 城市联动
      areaList,
      // 地址
      add: true,
      // 默认
      moren: false,
      showdel: false,
      showCity: '',
      // 按钮样式
      btnStyle: {
        position: 'absolute',
        top: `${910 / 75}rem`,
        left: 0,
        right: 0
      },
      address: {
        "address": "", // 详细地址
        "city": "", // 市
        "county": "", // 县
        "def": 0, // 是否为默认
        "enable": 1, // 是否可用 1 为正常 0为删除
        "id": 0, // id
        "memberId": 0, // 会员ID
        "name": "", // 姓名
        "phone": "", // 手机号
        "postcode": "", // 邮编
        "province": "" // 省
      }
    }
  },
  methods:{
    // 改变城市
    areaChange(a){
      console.log(a)
      this.show = false
      this.address.province = a[0].name
      this.address.city = a[1].name
      this.address.county = a[2].name
      this.address.postcode = a[2].code
      this.showCity = `${this.address.province}/${this.address.city}/${this.address.county}`
    },
    // 显示城市
    showArea(){
      this.show = true
    },
    deleltAdd(){
      this.Dialog.confirm({
        title: '删除',
        message: '确认要删除吗？'
      }).then(() => {
        console.log(this.show)
        this.$api.user.delReceipt(this.address.id).then(res=>{
          if(res.code == 200){
            this.Toast.success('删除成功')
            this.$router.go(-1)
          }else{
            this.Toast.fail(res.msg)
          }
        })
      })
    },
    // 提交
    sub(){
      let def = !this.add || this.moren
      if(def){
        this.address.def = 1
      }else{
        this.address.def = 0
      }
      this.address.memberId = this.userData.id
      console.log(this.address)
      this.$api.user.saveOrUpdateReceipt(this.address).then(res=>{
        console.log(res)
        if(res.code == 200){
          this.$router.go(-1)
        }
      })
    },
    // 更改信息
    changeName(val){
      this.address.name = val
    },
    // 更改信息
    changePhone(val){
      this.address.phone = val
    },
    // 更改信息
    changeAddress(val){
      this.address.address = val
    }
  },
  mounted(){
    this.$store.commit('changeTitle','收货地址')
    if(this.$route.query.not){
      this.add = false
    }
    if(this.$route.query.set != undefined){
      this.showdel = true
      this.$api.user.getReceiptById(this.$route.query.set).then(res=>{
        console.log(res)
        this.address = res.data
        this.moren = Boolean(res.data.def)
        this.showCity = `${this.address.province}/${this.address.city}/${this.address.county}`
      })
    }
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