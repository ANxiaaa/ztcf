<template>
  <div class="insureType">
    <van-checkbox-group v-model="result">
      <van-cell-group>
        <van-cell clickable title="交强险" @click="jq">
          <van-checkbox name="jiaoqiang" shape="square" ref="jqcheckbox" slot="right-icon"/>
        </van-cell>
      </van-cell-group>
      <div class="line"></div>
      <van-cell value="商业险"/>
      <van-cell class="shangye jt" @click="changPicker" title="三责险" :value="sanzetxt" clickable is-link />
      <van-cell-group class="shangye">
        <van-cell v-for="(item, index) in list" clickable :key="item" :title="`复选框 ${item}`" @click="toggle(index)">
          <van-checkbox :name="item" shape="square" ref="checkboxes" slot="right-icon"/>
        </van-cell>
      </van-cell-group>
    </van-checkbox-group>
    <div class="fixBox">
      <btn @click="save" name="确认修改"></btn>
    </div>
    <div class="pickerBox" v-show="showpicker" @click.stop="changPicker">
      <div  @click.stop>
        <van-picker class="xuanxiang" :swipe-duration="600" show-toolbar title="三责险" :columns="columns" @cancel="onCancel" @confirm="onConfirm"/>
      </div>
    </div>
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
      jqres: true,
      list: ['a','b','c'],
      result: [],
      columns: ['5万', '10万', '15万', '20万', '25万', '30万', '35万', '50万'],
      sanzetxt: '',
      sanzeold: '',
      showpicker: false
    }
  },
  methods:{
    jq(){
      this.$refs.jqcheckbox.toggle()
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    save(){
      console.log(this.result)
      console.log(this.sanzetxt)
    },
    onConfirm (value, index) {
      this.sanzetxt = value
      this.showpicker = !this.showpicker
    },
    onCancel() {
      this.showpicker = !this.showpicker
    },
    changPicker(){
      this.showpicker = !this.showpicker
    }
  },
  mounted(){
    this.$store.commit('changeTitle','保险类型')
    console.log(window.navigator.userAgent)
    this.$api.insurance.findCategoryByCompanyId(this.$route.query.id).then(res=>{
      console.log(res)
    })
  },
  computed: {
    insuranceSubData(){
      return this.$store.getters.insuranceSubData
    },
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
.pickerBox{
  position: fixed;
  bottom: 0;left: 0;right: 0;top: 0;
  background: rgba($color: #000000, $alpha: .6);
}
.xuanxiang{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

<style scoped>
>>> .van-cell{
  font-size: .426667rem;
  padding: 0 .4rem;
  line-height: 1.333333rem;
  height: 1.333333rem;
}
>>> .jt i{
  line-height: 1.35rem;
}
>>> .shangye span{
  font-size: .373333rem
}
</style>