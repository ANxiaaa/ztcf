<template>
  <div class="carStore">
    <ul>
      <li class="container" @click="toInfo(i)" v-for="i in userCarInfo" :key="i.id">
        <img class="carlogo" :src="require('@/assets/my/car.png')" alt="">
        <div>
          <p>{{i.carNumberPrefix}}{{i.carNumber}}</p>
          <span>{{i.carName}}</span>
        </div>
        <van-icon name="arrow" size=".4rem"/>
        <img v-if="userData.defaultCarInfoId == i.id" :src="require('@/assets/my/defult.png')" alt="" class="def">
      </li>
    </ul>
    <div class="bottom">
      <btn @click="$router.push('/indexAddCar')" name="添加车辆"></btn>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'carStore',
  components:{
    btn
  },
  data () {
    return {
    }
  },
  methods:{
    // 车辆信息
    toInfo(i){
      console.log(i)
      this.$router.push('/indexAddCar?carId=' + i.id)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '个人中心')
    console.log(this.userCarInfo)
  },
  computed:{
    // 汽车列表
    userCarInfo(){
      return this.$store.getters.userCarInfo
    },
    // 用户信息
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    },
  }
}
</script>

<style scoped lang="scss">
.carStore{
  height: 100%;
  overflow-y: auto;
}
ul{
  height: 90%;
  overflow-y: auto;
}
.bottom{
  position: absolute;
  bottom: 0;
  left: 0;right: 0;padding: .4rem 0;
}
li{
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: .533333rem;
  border-radius: .266667rem;
  padding: .466667rem .533333rem;
  position: relative;
  box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.1);
  .carlogo{
    width: 2.453333rem;
    height: 1.493333rem;
    background: #000;
    margin-right: .32rem;
  }
  .def{
    position: absolute;
    top: 0;left: .213333rem;
    width: .64rem;
  }
  div{
    flex: 1;
    p{
      font-size: .426667rem;
      color: #333;
      margin-bottom: .32rem;
    }
    span{
      font-size: .32rem;
      color: #B3B3B3;
    }
  }
}
</style>