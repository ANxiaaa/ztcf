<template>
  <div class="insurance">
    <div :style="bg">
      <div class="box container shadow">
        <div class="xinghao" @click="toInsureAdd">
          <b class="t600">车辆型号:</b>
          <p class="t600" :style="!carData.xinghao?{color: '#b3b3b3'}:{color: '#333'}">{{!carData.xinghao?'请选择车辆型号':carData.xinghao}}<span>></span></p>
        </div>
        <div class="chepai">
          <b>车牌号:</b>
          <div>
            <label class="l1" @click="show = true">
              <span>{{carData.zi}}</span>
              <img :src="require('@/assets/insurance/down.png')" alt="">
            </label>
            <p class="t600" :style="carData.shangpai?{color: '#b3b3b3'}:{color: '#333'}">
              <input name="num" :disabled="carData.shangpai" type="text" placeholder="请输入车牌号码" v-model="carData.num" @change="getByteLen" @keyup="get" @input="input" ref="input">
            </p>
            <label class="l2" @click="changeshangpai"><img :src="!carData.shangpai?require('@/assets/no.png'):require('@/assets/yes.png')" alt="">未上牌</label>
          </div>
        </div>
        <btn name="确认报价"></btn>
      </div>
      <div class="liucheng container">
        <p class="lcTitle">
          <img :src="require('@/assets/insurance/liucheng.png')" alt="">
          <span class="t600">咨询流程</span>
          <img :src="require('@/assets/insurance/liucheng.png')" alt="">
        </p>
        <ul class="container">
          <li class="leftLine"></li>
          <li class="list" v-for="(i, index) in liuchengList" :key="index">
            <div>
              <img :src="require('@/assets/insurance/rec.png')" alt="">
              <b>{{index + 1}}</b>
            </div>
            <p class="t600">{{i.title}}</p>
            <span class="t600">{{i.name}}</span>
          </li>
        </ul>
      </div>
    </div>
    <van-popup
      v-model="show"
      round
      position="bottom"
      :style="{ height: `${400 / 75}rem` }"
    >
      <van-picker :default-index="15" :columns="columns" @change="onChange" class="xuanze"/>
    </van-popup>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'insurance',
  components:{
    btn
  },
  data () {
    return {
      bg: {
        background: `url(${require('@/assets/insurance/indexTop.png')}) no-repeat`,
        backgroundSize: '100% 4.32rem',
        paddingTop: 230 / 75 + 'rem'
      },
      show: false,
      carData: {
        xinghao: '',
        zi: '豫',
        num: '',
        shangpai: false //false 未上牌  true 上牌
      },
      liuchengList: [{
        title: '添加车辆信息，点击确认报价',
        name: '输入车辆相关信息，查看模糊报价。'
      },{
        title: '添加车辆信息，点击确认报价',
        name: '输入车辆相关信息，查看模糊报价。'
      },{
        title: '添加车辆信息，点击确认报价',
        name: '输入车辆相关信息，查看模糊报价。'
      },{
        title: '添加车辆信息，点击确认报价',
        name: '输入车辆相关信息，查看模糊报价。'
      },{
        title: '添加车辆信息，点击确认报价',
        name: '输入车辆相关信息，查看模糊报价。'
      }],
      columns: ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新']
    }
  },
  methods:{
    changeshangpai(){
      this.carData.shangpai = !this.carData.shangpai;
    },
    getByteLen(val) {
      let len = 0;
      let res = '';
      // let re = ;
      for (let i = 0; i < val.length; i++) {
        let a = val.charAt(i);
        if (!/.*[\u4e00-\u9fa5]+.*$/.test(a) && !/\s+/.test(a)) {
          console.log(a)
          if(len >= 6){
            console.log(len)
            break
          }
          len ++;
          res += val[i]
        }
      }
      return res;
    },
    input() {
      var input = this.$refs.input;
      input.addEventListener('input',function(){
        this.search = input.value;
        console.log(this.search)
      },false)
    },
    get() {
      console.log(this.carData.num)
      let res = this.getByteLen(this.carData.num).toUpperCase()
      this.carData.num = res
    },
    onChange(picker, value, index) {
      this.carData.zi = value
    },
    toInsureAdd(){
      this.$router.push('/insureAddCar')
    }
  },
  mounted(){
    this.$store.commit('changeTitle','车险报价')
  },
}
</script>

<style scoped lang="scss">
.insurance{
  height: calc(100% - 1.306667rem);
  overflow-y: auto;
}
.box{
  height: 4.933333rem;
  padding: .666667rem .4rem;
  b{
    font-weight: 500;
    color: #999;
    font-size:.4rem;
  }
  .xinghao{
    height: .666667rem;
    display: flex;
    line-height: .666667rem;
    p{
      font-size:.373333rem;
      font-weight: 500;
      position: relative;
      flex: 1;
      font-size:.373333rem;
      line-height: .62rem;
      margin-left: .1rem;
      border-bottom: .013333rem solid #F2F4F7;
      span{
        font-family: '宋体';
        font-weight: bold;
        color: #999;
        position: absolute;
        right: 0;
      }
    }
  }
  .chepai{
    margin-top: .4rem;
    display: flex;
    margin-bottom: .746667rem;
    div{
      flex: 1;
      padding-left: .35rem;
      border-bottom: .013333rem solid #F2F4F7;
      display: flex;
      justify-content: space-between;
      line-height: .6rem;
      .l1{
        img{
          width: .266667rem;
          height: .16rem;
          vertical-align: super;
        }
      }
      input{
        flex: 1;
        border: none;
        height: .373333rem;
        &::placeholder{
          font-weight: 500;
          color: #999;
          font-family:PingFang SC;
          font-size: .373333rem;
        }
      }
      .l2{
        display: flex;
        img{
          height: .32rem;
          width: .32rem;
          margin-top: .15rem;
          margin-right: .1rem;
        }
      }
    }
  }
}
.liucheng{
  margin-top: 1.066667rem;
  .lcTitle{
    display: flex;
    justify-content: center;
    img{
      margin: .08rem 0;
      width: .453333rem;
      height: .253333rem;
    }
    span{
      font-size:.426667rem;
      margin: 0 .426667rem;
      line-height: 1;
      color: #EC8959;
    }
  }
  ul{
    position: relative;
    margin-bottom: .9rem;
    .list{
      margin-top: .533333rem;
      position: relative;
      padding-left: .88rem;
      font-weight: 500;
      div{
        position: absolute;
        left: 0;
        top: 0;
        width: .586667rem;
        height: .586667rem;
        img{
          width: .586667rem;
          height: .586667rem;
          display: block;
        }
        b{
          position: absolute;
          top: 0;right: 0;left: 0;bottom: 0;
          margin: auto;
          text-align: center;
          line-height: .586667rem;
          font-size:.32rem;
          font-family:Lato;
          font-weight:normal;
          color:#fff;
          text-shadow:0px 0px 5px rgba(204,136,47,0.8);
        }
      }
      p{
        line-height: .586667rem;
        font-size:.4rem;
        color:#666;
      }
      span{
        line-height: .586667rem;
        font-size:.32rem;
        color:#999;
      }
    }
    .leftLine{
      position: absolute
    }
  }
}
.xuanze{
  padding: 0;
  bottom: 0;
  left: 0;right: 0;
  z-index: 2;
  width: 100%;
  border-top: .013333rem solid #ececec
}
</style>
<style scoped>
.xuanze >>> div{
  width: 100%;
}
</style>