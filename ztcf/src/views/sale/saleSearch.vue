<template>
  <div class="saleSearch">
    <form action="/">
      <van-search @search="search" placeholder="品牌/车型/车系" v-model="searchData" shape="round" input-align="center"/>
    </form>
    <search-filter></search-filter>
  </div>
</template>

<script>
import searchFilter from '@/components/filter'
export default {
  name: 'saleSearch',
  components:{
    searchFilter
  },
  data () {
    return {
      searchData: ''
    }
  },
  methods:{
    search(val){
      console.log(val)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '特价车')
  }
}
</script>

<style scoped lang="scss">

</style>
