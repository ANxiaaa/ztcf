<template>
  <div class="sale" ref="scroll">
    <div style="width: 10rem;margin: auto">
      <div calss="container">
        <van-search @click="tosearch" placeholder="品牌/车型/车系" shape="round" disabled input-align="center"/>
      </div>
      <div class="more container">
        <img :src="moreImg" alt="">
      </div>
      <div class="goods">
        <ul class="t600" :style="{width: (goodsList.length * 272) / 75 + 'rem'}">
          <li v-for="(i, index) in goodsList" :key="index">
            <img :src="i.pic" alt="">
            <h6>{{i.txt}}</h6>
            <p>¥{{i.sale}} <del>¥{{i.yuanjia}}</del></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="line"></div>
    <div style="width: 10rem;margin: auto">
      <div class="hotBrand">
        <p class="t600"><img :src="require('@/assets/hot.png')" alt="">热门品牌</p>
        <div>
          <ul class="hotList t600" :style="{width: (hotList.length * 140) / 75 + 'rem'}">
            <li v-for="(i, index) in hotList" :key="index">
              <img :src="i.pic" alt="">
              <span>{{i.brand}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bd"></div>
    <div ref="sel">
      <car-select></car-select>
    </div>
  </div>
</template>

<script>
import carSelect from '@/components/carSelect'
export default {
  name: 'sale',
  components:{
    carSelect
  },
  data () {
    return {
      moreImg: require('@/assets/sale/baioti.png'),
      goodsList: [{
        pic: require('@/assets/sale/goods.png'),
        txt: '大众探岳 2019 330 TSI两驱豪华型 国VI',
        sale: '15万',
        yuanjia: '20万'
      },{
        pic: require('@/assets/sale/goods.png'),
        txt: '大众探岳 2019 330 TSI两驱豪华型 国VI',
        sale: '15万',
        yuanjia: '20万'
      },{
        pic: require('@/assets/sale/goods.png'),
        txt: '大众探岳 2019 330 TSI两驱豪华型 国VI',
        sale: '15万',
        yuanjia: '20万'
      },{
        pic: require('@/assets/sale/goods.png'),
        txt: '大众探岳 2019 330 TSI两驱豪华型 国VI',
        sale: '15万',
        yuanjia: '20万'
      },{
        pic: require('@/assets/sale/goods.png'),
        txt: '大众探岳 2019 330 TSI两驱豪华型 国VI',
        sale: '15万',
        yuanjia: '20万'
      }],
      hotList: [{
        brand: '奥迪',
        pic: require('@/assets/sale/goods.png')
      },{
        brand: '奥迪',
        pic: require('@/assets/sale/goods.png')
      },{
        brand: '奥迪',
        pic: require('@/assets/sale/goods.png')
      },{
        brand: '奥迪',
        pic: require('@/assets/sale/goods.png')
      },{
        brand: '奥迪',
        pic: require('@/assets/sale/goods.png')
      },{
        brand: '奥迪',
        pic: require('@/assets/sale/goods.png')
      },{
        brand: '奥迪',
        pic: require('@/assets/sale/goods.png')
      }]
    }
  },
  methods:{
    tosearch(){
      this.$router.push('/saleSearch')
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '特价车')
    let sideBar = document.querySelector('.van-index-bar__sidebar')
    this.$refs.scroll.onscroll = ()=>{
      if(this.$refs.sel.offsetTop <= this.$refs.scroll.scrollTop){
        sideBar.style.opacity = '1'
      }else{
        sideBar.style.opacity = '0'
      }
    }
  }
}
</script>

<style scoped lang="scss">
.sale{
  overflow-y: auto;
  position: absolute;
  bottom: 1.306667rem;
  top: 1.173333rem;
}
.more{
  height: 2.666667rem;
  img{
    display: block;
    width: 100%;
    height: 100%;
  }
}
.goods{
  margin-top: .373333rem;
  margin-bottom: .426667rem;
  overflow-x: scroll;
  &::-webkit-scrollbar{
    display: none;
  }
  ul{
    display: flex;
    justify-content: start;
    margin-left: .4rem;
    li{
      width: 3.626667rem;
      height: 4.266667rem;
      background: #FAFBFC;
      margin-right: .32rem;
      padding: 0 .266667rem;
      img{
        width: 2.533333rem;
        height: 1.333333rem;
        display: block;
        margin: auto;
        margin-top: .586667rem;
      }
      h6{
        font-size:.3rem;
        line-height: .47rem;
      }
      p{
        margin-top: .293333rem;
        font-size: .373333rem;
        color: #D95A41;
        del{
          font-size: .32rem;
          color: #999;
        }
      }
    }
  }
}
.hotBrand{
  div{
    overflow-x: scroll;
    &::-webkit-scrollbar{
      display: none;
    }
  }
  p{
    padding: .32rem;
    font-size: .426667rem;
    line-height: .52rem;
    overflow: hidden;
    img{
      height: .48rem;
      width: .48rem;
      display: block;
      float: left;
    }
  }
  .hotList{
    margin-top: .4rem;
    display: flex;
    justify-content: start;
    margin-left: .133333rem;
    padding-bottom: .4rem;
    li{
      width: 1.866667rem;
      text-align: center;
      color: #666;
      font-size: .373333rem;
      img{
        display: block;
        margin: auto;
        width: .96rem;
        height: .96rem;
      }
    }
  }
}
.bd{
  margin: 0;
}
</style>
<style scoped>
>>> .van-index-bar__sidebar{
  opacity: 0;
  transition: opacity .5s;
}
</style>
