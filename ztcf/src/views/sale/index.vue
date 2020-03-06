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
            <img :src="i.img" alt="">
            <h6>{{i.name}}</h6>
            <p>¥{{i.showCost}} <del>¥{{i.price}}</del></p>
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
import { baseUrl } from '@/utils/global'
export default {
  name: 'sale',
  components:{
    carSelect
  },
  data () {
    return {
      baseUrl,
      // 查看更多的图片
      moreImg: require('@/assets/sale/baioti.png'),
      // 推荐车辆列表
      goodsList: [],
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
        if(res.code == 200){
          this.hotList = res.data
          this.allBrand = res.data
          let indexList = res.data.map(i=>i.initial)
          this.indexList = [...new Set(indexList)].sort()
        }
      })
    },
    // 转换小数
    toFiexd2(num){
      num = num.toString()
      if(num.indexOf('.') != -1 && (num.slice(num.indexOf('.'))).length > 2){
        return (Number(num)).toFixed(2)
      }else{
        return Number(num)
      }
    },
    // 推广特价车
    findSale(){
      let _this = this
      this.$api.sale.findIndexSpecialPage('column').then(res=>{
        console.log(res)
        res.data.data.content.forEach(i=>{
          i.img = baseUrl + i.img
          i.showCost = _this.toFiexd2(i.showCost / 10000) + '万'
          i.price = _this.toFiexd2(i.price / 10000) + '万'
        })
        this.goodsList = res.data.data.content
        console.log(this.goodsList)
      })
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '特价车')
    this.sideBar()
    this.findAllBrand()
    this.findSale()
  }
}
</script>

<style scoped lang="scss">
.sale{
  overflow-y: auto;
  position: absolute;
  bottom: 1.306667rem;
  top: 0;
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
  overflow-x: auto;
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
        height: 1.55rem;
        display: block;
        margin: auto;
        margin-top: .586667rem;
      }
      h6{
        font-size:.3rem;
        line-height: .6rem;
      }
      p{
        margin-top: .2rem;
        font-size: .373333rem;
        color: #D95A41;
        del{
          font-size: .28rem;
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
      font-size: .25rem;
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
