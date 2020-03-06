<template>
  <div class="insurance">
    <div :style="bg">
      <div class="box container shadow">
        <div>
          <div class="xinghao" @click="toInsureAdd">
            <b class="t600">车辆型号:</b>
            <p class="t600" :style="!carData.xinghao?{color: '#b3b3b3'}:{color: '#333'}">
              <strong>{{!carData.xinghao?'请选择车辆型号':carData.xinghao}}</strong>
              <van-icon name="arrow" size=".3rem" color="#b3b3b3"/>
            </p>
          </div>
          <div class="chepai">
            <b>车牌号:</b>
            <div>
              <label class="l1" @click="show = true">
                <span>{{carData.zi}}</span>
                <img :src="require('@/assets/insurance/down.png')" alt="">
              </label>
              <p class="t600" :style="carData.shangpai?{color: '#b3b3b3'}:{color: '#333'}">
                <input name="num" :disabled="carData.shangpai" type="text" placeholder="请输入车牌号码" v-model="carData.num" @change="getByteLen" @input="input" ref="input">
              </p>
              <label class="l2" @click="changeshangpai"><img :src="!carData.shangpai?require('@/assets/no.png'):require('@/assets/yes.png')" alt="">未上牌</label>
            </div>
          </div>
          <div class="guoqi" v-show="showTime">
            <b class="t600">到期时间:</b>
            <p class="t600" :style="carData.shangpai?{color: '#b3b3b3'}:{color: '#333'}">{{carData.time}}</p>
          </div>
        </div>
        <btn @click="toVague" style="margin-top: .746667rem;" name="确认报价"></btn>
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
      bg: { // 背景
        background: `url(${require('@/assets/insurance/indexTop.png')}) no-repeat`,
        backgroundSize: '100% 4.32rem',
        paddingTop: 230 / 75 + 'rem'
      },
      // 显示
      show: false,
      // 汽车信息
      carData: {
        xinghao: '',
        zi: '豫',
        num: '',
        shangpai: false, //false 未上牌  true 上牌
        time: '2019年12月12日'
      },
      // 到期时间显示
      showTime: false,
      // 下面字的显示内容
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
      // 省份
      columns: ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新']
    }
  },
  methods:{
    // 跳转车险报价
    toVague(){
      this.$router.push('/vague')
    },
    // 改变是否上牌
    changeshangpai(){
      this.carData.shangpai = !this.carData.shangpai;
    },
    // 限制长度
    getByteLen(val) {
      let len = 0;
      let res = '';
      for (let i = 0; i < val.length; i++) {
        let a = val.charAt(i);
        if (!/.*[\u4e00-\u9fa5]+.*$/.test(a) && !/\s+/.test(a)) {
          if(len >= 6){
            break
          }
          len ++;
          res += val[i]
        }
      }
      return res;
    },
    // 监听输入框改变
    input(a) {
      var input = this.$refs.input;
      let res = this.getByteLen(input.value).toUpperCase()
      this.$set(this.carData, 'num', res)
      // 如果车牌号长度等于 6 查询
      if(res.length === 6){
        // 查询保险过期时间接口, 成功了返回对应时间
        this.showTime = true
      }else{
        this.showTime = false
      }
    },
    // 更改字
    onChange(picker, value, index) {
      this.carData.zi = value
    },
    // 跳转添加车辆
    toInsureAdd(){
      this.$api.carList.allOneCar().then(res=>{
        console.log(res.data)
        if(res.code == 200){
          let arr = []
          res.data.forEach(i=>{
              arr.push(i.initial)
          })
          let indexList = [...new Set(arr)].sort()
          console.log(indexList)
          this.$store.commit('changeAllCar',res.data)
          this.$store.commit('changeAllIndexList',indexList)
          this.$router.push('/insureAddCar')
        }else{
          this.Toast.fail('获取失败, 请重试!')
        }
      })
    }
  },
  activated(){
    this.$store.commit('changeTitle','车险报价')
    if(this.$route.query.carName){
      console.log(this.$route.query.carName)
      this.$set(this.carData, 'xinghao', this.$route.query.carName)
      console.log(this.carData)
    }
  }
}
</script>

<style scoped lang="scss">
.insurance{
  height: calc(100% - 1.306667rem);
  overflow-y: auto;
}
.box{
  padding: .666667rem .4rem;
  b{
    font-weight: 500;
    color: #999;
    font-size:.4rem;
    white-space: pre;
  }
  label{
    white-space: pre;
    // flex: 1;
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
      line-height: .62rem;
      margin-left: .1rem;
      border-bottom: .013333rem solid #F2F4F7;
      white-space: pre;
      display: flex;
      strong{
        margin-right: .5rem;
        width: 6rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      i{
        line-height: .45rem
      }
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
          font-weight: bold;
          color: #999;
          font-size: .3rem;
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
.guoqi{
  margin-top: .4rem;
  display: flex;
  justify-content: space-between;
  p{
    flex: 1;
    padding-left: .35rem;
    border-bottom: .013333rem solid #F2F4F7;
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