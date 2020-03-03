<template>
  <div class="newsContent">
    <h1>{{getContent.title}}</h1>
    <p class="time">{{getContent.ctime.substr(0, 10)}}</p>
    <div class="content" v-html="getContent.content"></div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'newsContent',
  methods: {
    
  },
  mounted(){
    console.log(this.getContent)
  },
  computed: {
    getContent(){
      return this.$store.getters.newsData
    },
  }
}
</script>

<style scoped lang="scss">
.newsContent{
  height: 100%;
  padding: .4rem;
  overflow-y: auto;
  .time{
    font-size: .34rem;
    color: #999;
    margin-top: .666667rem;
    line-height: .733333rem;
  }
}
h1{
  font-size: .666667rem;
  font-weight: bold;
  color: #333;
}
.content{
  margin-top: .533333rem;
}
</style>
<style scoped>
.content >>> img{
  width: 100%;
}
.content >>> p{
  color: #666;
  font-size: .4rem;
  line-height: .533333rem;
  /* letter-spacing: .153333rem; */
  margin: .4rem 0;
}
</style>
