<template>
  <div class="carThree">
    <van-tabs v-model="active" :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky @change="change" title-active-color="#4771E6" title-inactive-color="#666">
      <van-tab v-for="(i, index) in yearList" :title="i.name" :key="index">
        <ul>
          <li @touchstart="down" @touchend="up" @click="toMsg(item)" v-for="(item, idx) in allCarThree" :key="idx" v-if="item.yeartype == activeYear || active == 0">
            <img :src="item.logo" alt="">
            <div>
              <h4>{{item.name}}</h4>
              <span>{{item.productionstate}}{{item.salestate == '停产' ? '' : item.salestate}}</span>
              <p>售价: <b>{{item.price}}</b></p>
            </div>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'carThree',
  components:{

  },
  data () {
    return {
      // 选中状态
      active: '',
      // 选中年份
      activeYear: '',
      // 年限列表
      yearList: [{
        name: '全部年款',
        id: 0
      }],
    }
  },
  methods:{
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
          i.style.background = '#fff'
        }
      })
    },
    // 改变选择
    change(a,b){
      this.activeYear = b.slice(0, 4)
    },
    toMsg(item){
      this.$emit('toMsg', item)
    }
  },
  mounted(){
    console.log(this.allCarThree)
    let arr = Array.from(new Set(this.allCarThree.map(i=>i.yeartype))).sort().reverse();
    arr.forEach((i, index)=>{
      this.yearList.push({
        name: i + '款',
        id: i
      })
    })
  },
  computed:{
    allCarThree(){
      let data = this.$store.getters.allCarThree
      return data
    },
  }
}
</script>

<style scoped lang="scss">
.carThree{
  width: 10rem;
  margin: auto;
  height: 100%;
}
ul{
  li{
    display: flex;
    justify-content: space-between;
    padding: .4rem;
    img{
      width: 2.666667rem;
      height: 1.76rem;
      margin-right: .333333rem;
    }
    div{
      flex: 1;
      h4{
        color: #333;
        font-size: .4rem;
        white-space: pre;
        width: 6rem;
        overflow-x: auto;
      }
      span{
        display: block;
        width: 1.466667rem;
        height: .373333rem;
        border-radius:.186667rem;
        background: #F7F7F7;
        color: #B3B3B3;
        font-size:.266667rem;
        line-height: .373333rem;;
        text-align: center;
        margin-top: .066667rem;
      }
      p{
        margin-top: .35rem;
        font-size:.32rem;
        color: #999;
        b{
          font-size: .373333rem;
          color: #E56245;
        }
      }
    }
  }
}
</style>