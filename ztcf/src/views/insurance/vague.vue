<template>
  <div class="vague">
    <div class="pagebg">
      <img :src="require('@/assets/insurance/vagueBg.png')" alt="">
    </div>
    <div class="carBox container shadow t600">
      <div class="carInfo">
        <img :src="require('@/assets/sale/goods.png')" alt="">
        <div>
          <b>豫A88888</b>
          <p>奥迪A3系2019款 1.5L 豪华版</p>
        </div>
        <span>></span>
      </div>
      <div class="bd"></div>
      <div class="add">
        投保地
        <b>河南郑州 <span>></span></b>
      </div>
    </div>
    <div class="scheme container shadow t600">
      <div class="title">
        <p>保险方案<b @click="toInsureType">修改 <span>></span></b></p>
        <span>当前为基础报价方案，可修改报价方案进行精确报价。</span>
      </div>
      <ul>
        <li>
          交强险
          <b>投保</b>
        </li>
        <li>
          交强险
          <b>投保</b>
        </li>
        <li>
          三责险
          <b>20万</b>
        </li>
        <li>
          交强险
          <b>投保</b>
        </li>
        <li>
          交强险
          <b>投保</b>
        </li>
      </ul>
    </div>
    <div class="baojia container shadow t600">
      <div class="title">
        <p>模糊报价<b>¥15000 <span>></span></b></p>
        <span>当前为基础报价方案，点击精确报价可获得精准报价方案。</span>
      </div>
    </div>
    <div class="fixBox">
      <btn @click="toExact" name="精准报价"></btn>
    </div>
    <van-popup round v-model="improvement">
      <div class="pp t600">
        <img :src="require('@/assets/insurance/pp.png')" alt="">
        <p class="p1">完善车辆信息</p>
        <p class="p2">获取多种保险方案报价</p>
        <button @touchstart="down" @touchend="up">立即完善</button>
        <p class="p3">暂不完善</p>
      </div>
    </van-popup>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'vague',
  components:{
    btn
  },
  data () {
    return {
      improvement: false,
    }
  },
  methods:{
    toExact(){
      this.improvement = true;
    },
    down(a){
      a.target.style.background = '#dd9a38'
    },
    up(a){
      a.target.style.background = '#F3B356'
    },
    toInsureType(){
      this.$router.push('/insureType')
    }
  },
  mounted(){
    this.$store.commit('changeTitle','车险报价')
  }
}
</script>

<style scoped lang="scss">
.vague{
  height: 100%;
  overflow-y: auto;
  position: relative;
}
.pagebg{
  position: absolute;
  top: 0;left: 0;right: 0;
  height: 2.666667rem;
  z-index: -1;
  img{
    height: 100%;
    width: 100%;
    display: block;
  }
}
.pp{
  width: 7.2rem;
  height: 8.293333rem;
  text-align: center;
  color: #F1BE5B;
  img{
    display: block;
    width: 7.2rem;
    height: 4rem;
    margin-bottom: .266667rem;
  }
  .p1{
    font-size: .426667rem;
  }
  .p2{
    font-size: .373333rem;
  }
  .p3{
    font-size:.373333rem;
    color: #999;
    margin-top: .2rem;
    font-weight: 500;
  }
  button{
    width: 5.333333rem;
    height: 1.066667rem;
    margin: .86rem auto 0;
    border: none;
    background: #F3B356;
    border-radius:.133333rem;
    font-weight:500;
    font-size: .426667rem;
    color: #fff;
  }
}
.carBox{
  height: 3.2rem;
  background: #fff;
  margin-top: .8rem;
  padding: .533333rem .4rem .293333rem;
  color: #333;
  .carInfo{
    display: flex;
    justify-content: space-between;
    height: 1.333333rem;
    img{
      width: 2.48rem;
      height: 100%;
      display: block;
    }
    div{
      flex: 1;
      padding-left: .333333rem;
      font-weight: 500;
      line-height: .6rem;
      font-size: .373333rem;
      p{
        color: #999;
        width: 5rem;
        white-space: pre;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    span{
      line-height: 1.333333rem;
    }
  }
  span{
    font-family: '宋体';
    font-weight: bold;
    color: #999;
    font-size:.373333rem;
  }
  .bd{
    margin-top: .3rem;
  }
  .add{
    padding-top: .2rem;
    display: flex;
    justify-content: space-between;
    b{
      color: #999;
      font-weight: 500;
    }
  }
}
.scheme, .baojia{
  padding: .48rem .4rem .293333rem;
  margin-top: .533333rem;
}
.title{
  p{
    display: flex;
    justify-content: space-between;
    font-size:.48rem;
    color: #333;
    margin-bottom: .1rem;
    b{
      font-size: .373333rem;
      color: #4771E6;
      span{
        color: #999;
        font-family: '宋体';
        font-size:.373333rem;
      }
    }
  }
  &>span{
    font-size: .32rem;
    color: #999;
  }
}
.baojia b{
  color: #D95A41 !important;
}
.scheme{
  li{
    display: flex;
    justify-content: space-between;
    font-size: .373333rem;
    color: #333;
    margin-top: .4rem;
    b{
      color: #999;
    }
  }
}
.fixBox{
  padding: .346667rem;
  position: fixed;
  bottom: 0;left: 0;right: 0;
  background: #fff;
}

</style>