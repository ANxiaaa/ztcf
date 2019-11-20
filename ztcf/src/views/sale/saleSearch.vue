<template>
  <div class="saleSearch">
    <form v-if="isSearch" action="/">
      <van-search @search="search" placeholder="品牌/车型/车系" v-model="searchData" shape="round"/>
    </form>
    <search-filter v-show="!isSearch || showRes"></search-filter>
    <div v-if="!isSearch || showRes" class="container list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <leftpic :data="searchList"></leftpic>
      </van-list>
    </div>
  </div>
</template>

<script>
import searchFilter from '@/components/filter'
import leftpic from '@/components/list/leftpic'
export default {
  name: 'saleSearch',
  components:{
    searchFilter,
    leftpic
  },
  data () {
    return {
      searchData: '',
      loading: false,
      finished: false,
      showRes: false,
      searchList: []
    }
  },
  methods:{
    search(val){
      console.log(val)
      this.showRes = true
    },
    onLoad(){
      let _this = this
      if(this.isSearch){ // 搜索接口
        setTimeout(()=>{
            let data = [{
              url: require('@/assets/index/tjclist.png'),
              title: '2019款DBS superlrggrra',
              label: ['奥迪-A3','2019款'],
              price: '20万',
              sale: '15万',
              rate: 5
            },{
              url: require('@/assets/index/tjclist.png'),
              title: '2019款DBS superlrggrra',
              label: ['奥迪-A3','2019款'],
              price: '20万',
              sale: '15万',
              rate: 5
            },{
              url: require('@/assets/index/tjclist.png'),
              title: '2019款DBS superlrggrra',
              label: ['奥迪-A3','2019款'],
              price: '20万',
              sale: '15万',
              rate: 5
            },{
              url: require('@/assets/index/tjclist.png'),
              title: '2019款DBS superlrggrra',
              label: ['奥迪-A3','2019款'],
              price: '20万',
              sale: '15万',
              rate: 5
            },{
              url: require('@/assets/index/tjclist.png'),
              title: '2019款DBS superlrggrra',
              label: ['奥迪-A3','2019款'],
              price: '20万',
              sale: '15万',
              rate: 5
            },{
              url: require('@/assets/index/tjclist.png'),
              title: '2019款DBS superlrggrra',
              label: ['奥迪-A3','2019款'],
              price: '20万',
              sale: '15万',
              rate: 5
            },{
              url: require('@/assets/index/tjclist.png'),
              title: '2019款DBS superlrggrra',
              label: ['奥迪-A3','2019款'],
              price: '20万',
              sale: '15万',
              rate: 5
            }]
          data.forEach(i=>{
            _this.searchList.push(i)
          })
          this.loading = false;
          console.log(_this.searchList.length)
          if(_this.searchList.length > 30){
            _this.finished = true;
          }
        },2000)
      }else { // 更多特价车接口
        setTimeout(()=>{

        },0)
      }
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '特价车')
  },
  computed:{
    isSearch(){
      return this.$route.query.title === '搜索'
    }
  }
}
</script>

<style scoped lang="scss">
.saleSearch{
  height: 100%;
  overflow-y: auto;
}
.list{
  margin-top: .3rem;
}
</style>
