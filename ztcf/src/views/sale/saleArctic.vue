<template>
  <div class="saleArctic">
    <click-filter @getSend="getSend"></click-filter>
    <div class="list container">
      <leftpic :data="arcticList"></leftpic>
    </div>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
import clickFilter from '@/components/clickFilter'
import leftpic from '@/components/list/leftpic'
export default {
  name: 'saleArctic',
  components:{
    btn,
    clickFilter,
    leftpic
  },
  data () {
    return {
      arcticList: [{
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
    }
  },
  methods:{
    getSend(a){
      console.log(a)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '选择车型')
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped lang="scss">
.saleArctic{
  height: 100%;
  overflow-y: auto;
}
.list{
  margin-top: .3rem;
}
</style>