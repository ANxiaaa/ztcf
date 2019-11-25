<template>
  <div class="saleBrand">
    <van-index-bar :index-list="indexList" highlight-color="#2E6BE6">
      <div v-for="(i, index) in 4" :key="index" :index="1">
        <van-index-anchor class="listTop t600"><p class="container">一汽奥迪</p></van-index-anchor>
        <ul class="list">
          <li class="container" @click="toxinghao(0)">
            <div class="t600">
              <img :src="require('@/assets/sale/goods.png')" alt="">
              <div>
                <p>奥迪A3</p>
                <span>18.86-25.09万</span>
              </div>
            </div>
            <div class="bd"></div>
          </li>
          <li class="container">
            <div class="t600">
              <img :src="require('@/assets/sale/goods.png')" alt="">
              <div>
                <p>奥迪A3</p>
                <span>18.86-25.09万</span>
              </div>
            </div>
            <div class="bd"></div>
          </li>
          <li class="container">
            <div class="t600">
              <img :src="require('@/assets/sale/goods.png')" alt="">
              <div>
                <p>奥迪A3</p>
                <span>18.86-25.09万</span>
              </div>
            </div>
            <div class="bd"></div>
          </li>
          <li class="container">
            <div class="t600">
              <img :src="require('@/assets/sale/goods.png')" alt="">
              <div>
                <p>奥迪A3</p>
                <span>18.86-25.09万</span>
              </div>
            </div>
            <div class="bd"></div>
          </li>
          <li class="container">
            <div class="t600">
              <img :src="require('@/assets/sale/goods.png')" alt="">
              <div>
                <p>奥迪A3</p>
                <span>18.86-25.09万</span>
              </div>
            </div>
            <div class="bd"></div>
          </li>
          <li class="container">
            <div class="t600">
              <img :src="require('@/assets/sale/goods.png')" alt="">
              <div>
                <p>奥迪A3</p>
                <span>18.86-25.09万</span>
              </div>
            </div>
            <div class="bd"></div>
          </li>
          <li class="container">
            <div class="t600">
              <img :src="require('@/assets/sale/goods.png')" alt="">
              <div>
                <p>奥迪A3</p>
                <span>18.86-25.09万</span>
              </div>
            </div>
            <div class="bd"></div>
          </li>
        </ul>
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'saleBrand',
  components:{
    btn
  },
  data () {
    return {
      indexList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    }
  },
  methods:{
    toxinghao(id){
      this.$router.push('/saleArctic?id=' + id)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '选择车系')
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped lang="scss">
.saleBrand{
  height: 100%;
  overflow-y: auto;
}
.listTop{
  background: #F2F4F7;
}
.list{
  overflow: hidden;
  li{
    .t600{
      margin: .32rem 0;
      height: 2.4rem;
      display: flex;
      font-weight: 500;
      div{
        flex: 1;
        line-height: 1;
        margin-left: .32rem;
      }
      img{
        height: 100%;
        width: 3.2rem;
        display: block;
      }
      p{
        font-size:.426667rem;
        color: #333333;
        margin-top: .613333rem;
        margin-bottom: .4rem;
      }
      span{
        color: #E56245;
        font-size: .373333rem;
      }
    }
    .bd{
      margin: 0;
      height: .026667rem;
    }
  }
}
</style>
<style scoped>
.listTop >>> .van-index-anchor{
  font-size: .373333rem;
  font-weight: 500;
  color: #666;
  line-height: 1.7
}
>>> .van-index-bar__sidebar{
  display: none;
}
</style>