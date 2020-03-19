<template>
  <div class="insureType">
    <van-cell-group>
      <van-cell v-for="(i, index) in list" :value="i.content" @click="toggle(i)" clickable :key="index" :title="i.category">
        <van-checkbox v-show="i.categorySubitem == null" slot="right-icon" shape="square" v-model="i.value" :name="i.category" ref="checkboxes"/>
        <van-icon v-show="i.categorySubitem != null" slot="right-icon" name="arrow" style="line-height: inherit;"/>
      </van-cell>
    </van-cell-group>
    <div class="fixBox">
      <btn @click="save" name="确认修改"></btn>
    </div>
    <van-popup v-model="show" round position="bottom">
      <van-picker :default-index="popData.index" cancel-button-text="清空" :swipe-duration="600" show-toolbar :title="popData.title" :columns="popData.columns" value-key="option" @cancel="onCancel" @confirm="onConfirm"/>
    </van-popup>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'insureType',
  components:{
    btn
  },
  data () {
    return {
      result: [],
      list: [],
      all: [],
      show: false,
      popData: {}
    }
  },
  methods:{
    onCancel(item, value){
      this.list.forEach(i=>{
        if(i.id == item.id){
          i.content = ''
          i.value = false
          i.index = 0
        }
      })
      this.show = false
    },
    onConfirm(item, value){
      console.log(item, value)
      this.list.forEach(i=>{
        if(i.id == item.parentid){
          i.content = item.option
          i.value = item.id
          i.index = value
        }
      })
      this.show = false
    },
    toggle(item) {
      if(item.categorySubitem != null){
        this.show = true
        item.categorySubitem.forEach(j => {
          j.parentid = item.id
        })
        this.popData = {
          title: item.category,
          columns: item.categorySubitem,
          index: item.index
        }
        return
      }
      this.$refs.checkboxes.forEach(i=>{
        if(i.name == item.category)i.toggle()
      });
    },
    save(){
      let categorys = [],
          subData = this.insuranceSubData
      this.list.forEach(i=>{
        if(i.value === false) return
        let item = {
          "category": i.category, // 保险类目
          "categoryId": i.id, // 保险类目ID
          "subitemId": null, // 保险类目子项ID
        }
        if(typeof(i.value) == 'number') item.subitemId = i.value
        categorys.push(item)
      })
      subData.offer.categorys = categorys
      console.log(subData)
      this.$api.insurance.saveMemberQueryInsurance(subData).then(res=>{
        if(res.code == 200){
          this.$store.commit('changeInsuranceData', res.data)
          this.$store.commit('changeInsuranceSubData', subData)
          this.$router.go(-1)
        }
      })
    }
  },
  computed: {
    insuranceSubData(){
      return this.$store.getters.insuranceSubData
    },
  },
  mounted(){
    this.$store.commit('changeTitle','保险类型')
    console.log(window.navigator.userAgent)
    this.$api.insurance.findCategoryByCompanyId(this.$route.query.id).then(res=>{
      this.all = res.data
      res.data.forEach(i => {
        let item = {
          category: i.category,
          id: i.id,
          value: false
        }
        if(i.categorySubitem != null){
          item.categorySubitem = i.categorySubitem
        }
        this.list.push(item)
      })
      console.log(this.list)
    })
  }
}
</script>

<style scoped lang="scss">
.insureType{
  height: 100%;
  overflow-y: auto;
}
.fixBox{
  padding: .346667rem;
  position: fixed;
  bottom: 0;left: 0;right: 0;
  background: #fff;
}
</style>

<style scoped>
>>> .van-cell span{
  font-size: .373333rem;
}
</style>