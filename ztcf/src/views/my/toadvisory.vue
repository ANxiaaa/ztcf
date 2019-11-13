<template>
  <div class="toadvisory t600">
    <div class="btnbox">
      <div @click="showPhone = true">
        <img :src="require('@/assets/my/dianhua.png')" alt="">
        <p>电话咨询</p>
      </div>
      <div @click="showewm = true">
        <img :src="require('@/assets/my/erweima.png')" alt="">
        <p>扫码咨询</p>
      </div>
    </div>
    <div class="liuyan container">
      <van-cell-group>
        <van-field
          v-model="message"
          :border="false"
          type="textarea"
          placeholder="请尽情表达您对平台的宝贵意见，我们会虚心接受！"
        />
      </van-cell-group>
    </div>
    <div class="qq container">
      <van-cell-group>
        <van-field
          v-model="lianxi"
          :border="false"
          type="textarea"
          placeholder="请输入您的手机号/微信/QQ"
        />
      </van-cell-group>
    </div>
    <btn name="提交" :click="sub"></btn>
    <van-popup v-model="showPhone" round class="showPhone t600">
      <p>13455554444</p>
      <van-cell clickable title="拨打电话"/>
    </van-popup>
    <van-popup v-model="showewm" round class="showewm t600">
      <van-cell clickable title="扫码关注"/>
      <img :src="require('@/assets/my/erweima.png')" alt="">
      <span>扫描二维码 关注郑泰科技</span>
    </van-popup>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import btn from '@/components/input/btn'
export default {
  name: 'toadvisory',
  components:{
    btn
  },
  data () {
    return {
      message: '',
      lianxi: '',
      showPhone: false,
      showewm: false
    }
  },
  methods:{
    sub(){
      console.log(this.message)
      console.log(this.lianxi)
    }
  },
  mounted(){
    this.$store.commit('changeTitle','在线咨询')
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
.toadvisory{
  padding-top: .96rem;
  height: 100%;
  width: 10rem;
  margin: auto;
  font-weight: 500;
}
.btnbox{
  display: flex;
  justify-content: space-around;
  div{
    width: 1.613333rem;
    text-align: center;
    color: #333333;
    line-height: 1rem;
    font-size: .32rem;
    img{
      width: 1.613333rem;
      height: 1.613333rem;
      display: block;
    }
  }
}
.qq{
  margin-bottom: 1.4rem;
}
.showPhone{
  p{
    color: #333;
    height: 1.466667rem;
    line-height: 1.466667rem;
    font-size:.48rem;
    border-bottom: .026667rem solid #eee;
    font-weight: 500;
  }
  .van-cell{
    height: 1.173333rem;
    color: #4771E6;
  }
}
.showewm.van-popup{
  height: 7.44rem;
  width: 7.2rem;
  text-align: center;
  .van-cell::after{
    display: none;
  }
  p{
    font-size: .426667rem;
    color: #333;
  }
  img{
    width: 4.666667rem;
    height: 4.666667rem;
    margin: .266667rem auto 0;
    display: block;
    margin-bottom: .213333rem;
  }
  span{
    font-size:.32rem;
    color: #999999;
  }
}
</style>
<style scoped>
>>> .showPhone.van-popup{
  text-align: center;
  width: 7.2rem;
  height: 2.64rem;
}
>>> .van-cell-group::after{
  display: none;
}
>>> .van-cell.van-field,>>> .van-field__body,>>> textarea{
  padding: 0;
  height: 100%;
}
>>> textarea{
  padding: .2rem;
}
.liuyan >>> .van-cell-group{
  margin-top: .666667rem;
  height: 4.8rem;
  border:.026667rem solid rgba(237,239,242,1);
  border-radius:.133333rem;
}
.qq >>> .van-cell-group{
  margin-top: .746667rem;
  border:.026667rem solid rgba(237,239,242,1);
  border-radius:.133333rem;
  height: 1.173333rem;
}
.qq >>> textarea{
  height: 100%;
  min-height: 0;
  line-height: .666667rem
}
</style>