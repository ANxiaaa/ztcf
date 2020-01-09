<template>
  <div class="sale" ref="scroll">
      <div>
        <van-search @click="tosearch('搜索')" placeholder="品牌/车型/车系" shape="round" disabled input-align="center"/>
      </div>
    <div style="width: 10rem;margin: auto">
      <div @click="tosearch(0)" class="more container">
        <img :src="moreImg" alt="">
      </div>
      <div class="goods">
        <ul class="t600" :style="{width: (goodsList.length * 272) / 75 + 'rem'}">
          <li @touchstart="down" @touchend="up" @click="toCarMsg(0)" v-for="(i, index) in goodsList" :key="index">
            <img :src="i.pic" alt="">
            <h6>{{i.txt}}</h6>
            <p>¥{{i.sale}} <del>¥{{i.yuanjia}}</del></p>
          </li>
        </ul>
      </div>
    </div>
    <div class="line"></div>
    <div style="width: 10rem;margin: auto">
      <!-- 热门品牌 -->
      <div class="hotBrand">
        <p class="t600"><img :src="require('@/assets/hot.png')" alt="">热门品牌</p>
        <div>
          <ul class="hotList t600" :style="{width: (hotList.length * 140) / 75 + 'rem'}">
            <li @touchstart="down" @touchend="up" v-for="(i, index) in hotList" @click="topinpai(i.id)" :key="index">
              <img :src="i.logo" alt="">
              <span>{{i.name}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="bd"></div>
    <!-- 所有品牌 -->
    <div ref="sel">
      <car-select @click="topinpai" :indexList="indexList" :allBrand="allBrand"></car-select>
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
      // 查看更多的图片
      moreImg: require('@/assets/sale/baioti.png'),
      // 推荐车辆列表
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
      // 热门品牌列表
      hotList: [],
      // 索引
      indexList: [],
      // 所有品牌
      allBrand: []
    }
  },
  methods:{
    // 跳转搜索
    tosearch(a){
      this.$router.push('/saleSearch?title=' + a)
    },
    // 跳转车辆信息
    toCarMsg(id){
      this.$router.push('/carMsg?id=' + id)
    },
    // 跳转特价车品牌
    topinpai(id){
      this.$router.push('/saleBrand?id=' + id)
    },
    // 点击反馈
    down(a){
      a.path.forEach(i=>{
        if(i.tagName === 'LI'){
            i.style.background = '#ececec'
        }
      })
    },
    up(a){
      a.path.forEach(i=>{
        if(i.tagName === 'LI'){
            i.style.background = 'none'
        }
      })
    },
    // 判定侧边索引的显示和隐藏
    sideBar(){
      let sideBar = document.querySelector('.van-index-bar__sidebar')
      this.$refs.scroll.onscroll = ()=>{
        if(this.$refs.sel.offsetTop <= this.$refs.scroll.scrollTop){
          sideBar.style.opacity = '1'
          sideBar.style.right = '0'
        }else{
          sideBar.style.opacity = '0'
          sideBar.style.right = `-${50 / 75}rem`
        }
      }
    },
    // 查询所有特价车的品牌及数量
    findAllBrand(){
      this.$api.sale.findAllBrand().then(res=>{
        console.log(res)
        this.hotList = res.data
        this.allBrand = res.data
        let indexList = res.data.map(i=>i.initial)
        this.indexList = [...new Set(indexList)].sort()
      })
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '特价车')
    this.sideBar()
    this.findAllBrand()
  }
}
</script>

<style scoped lang="scss">
.sale{
  overflow-y: auto;
  position: absolute;
  bottom: 1.306667rem;
  top: 1.173333rem;
  width: 100%;
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
    margin-top: .15rem;
    display: flex;
    justify-content: start;
    margin-left: .133333rem;
    padding-bottom: .4rem;
    li{
      padding: .13rem 0 .1rem;
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
  /* right: -100%; */
  transition: opacity .5s, right .5s;
}
</style>
