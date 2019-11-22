<template>
  <div class="carParam">
    <h4 class="t600">奥迪A3系 2019款DBS superlrggrra</h4>
    <van-tabs v-model="active" swipeable :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky @change="changeOrder" title-active-color="#4771E6" title-inactive-color="#666">
      <van-tab v-for="(i, index) in paramList" :title="i.name" :key="index">
        <ul class="box t600">
          <li v-for="j in i.list" :key="j.title">
            <h5>{{j.title}}</h5>
            <p v-for="m in j.items" :key="m.key">
              <span>{{m.key}}</span>
              <span>{{m.val}}</span>
            </p>
          </li>
        </ul>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
  name: 'carParam',
  components:{
    btn
  },
  data () {
    return {
      active: 'a',
      paramList: [{
        name: '基本信息',
        id: 0,
        list: [{
          title: '详细参数',
          items: [{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },]
        },{
          title: '详细参数',
          items: [{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },]
        },{
          title: '详细参数',
          items: [{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },{
            key: '厂商指导价',
            val: '¥13万'
          },]
        }]
      },{
        name: '车体',
        id: 1
      },{
        name: '发动机',
        id: 2
      },{
        name: '变速箱',
        id: 3
      },{
        name: '底盘制动',
        id: 4
      },{
        name: '安全配置',
        id: 5
      }]
    }
  },
  methods:{
    changeOrder(a,b){
      console.log(a,b)
    }
  },
  mounted(){
    this.$store.commit('changeTitle', '详细参数')
  },
  computed:{
    id(){
      return this.$route.query.id
    }
  }
}
</script>

<style scoped lang="scss">
.carParam{
  height: 100%;
  overflow-y: auto;
}
h4{
  font-size:.426667rem;
  color: #333;
  font-weight: 600;
  line-height: 1rem;
  margin: 0 .4rem;
}
.box{
  font-weight: 500;
  h5{
    height: .746667rem;
    line-height: .746667rem;
    font-size: .32rem;
    color: #999;
    padding: 0 .4rem;
    background: #F2F4F7;
  }
  p{
    margin: .533333rem .4rem;
    line-height: 1;
    color: #333333;
    font-size: .373333rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
