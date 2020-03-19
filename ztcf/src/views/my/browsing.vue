<template>
  <div class="browsing">
    <van-tabs style="height: 100%;overflow-y: auto;" v-model="active" swipeable :line-width="40 / 75 + 'rem'" :line-height="8 / 75 + 'rem'" color="#4771E6" sticky @change="changeOrder" title-active-color="#4771E6" title-inactive-color="#666">
      <van-tab title="特价车">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="load">
          <div v-for="(i, index) in resList" :key="index" class="type1">
            <img :src="baseUrl + i.picture" alt="">
            <div>
              <p>{{i.titl}}</p>
              <span>{{timeFormat(i.createTime)}}</span>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="车型大全">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="load">
          <div v-for="(i, index) in resList" :key="index" class="type1">
            <img :src="i.picture" alt="">
            <div>
              <p>{{i.titl}}</p>
              <span>{{timeFormat(i.createTime)}}</span>
            </div>
          </div>
        </van-list>
      </van-tab>
      <van-tab title="咨讯">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="load">
          <div v-for="(i, index) in resList" :key="index" class="type1 type3">
            <div>
              <p>{{i.titl}}</p>
              <span>中国网: {{timeFormat(i.createTime)}}</span>
            </div>
            <img :src="i.picture" alt="">
          </div>
        </van-list>
      </van-tab>
      <van-tab title="查询记录">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="load">
          <div v-for="(i, index) in resList" :key="index" class="moreType container">
            <div v-if="i.mbrType == 4" class="type4">
              <h4>违章查询<strong>{{timeFormat(i.createTime)}}</strong></h4>
              <h5>{{i.titl}}</h5>
              <b>未处理 <span>{{i.param.count}}</span> 扣分 <span>{{i.param.totalscore}}</span> 罚款 <span>{{i.param.totalprice}}</span></b>
            </div>
            <div v-if="i.mbrType == 7" class="type7">
              <h4>限行查询<strong>{{timeFormat(i.createTime)}}</strong></h4>
              <div class="typeBtm">
                <div>
                  <p>{{i.param.cityname}}</p>
                  <span>城市</span>
                </div>
                <div>
                  <p>{{dateFormat(i.param.date)}}</p>
                  <span>日期</span>
                </div>
              </div>
            </div>
            <div v-if="i.mbrType == 9" class="type9">
              <h4>快递查询<strong>{{timeFormat(i.createTime)}}</strong></h4>
              <div class="typeBtm">
                <p>物流单号：<span>{{i.param.result.typename}}</span></p>
                <p>快递公司：<span>{{i.param.result.number}}</span></p>
              </div>
            </div>
            <div v-if="i.mbrType == 10" class="type9">
              <h4>vin查询<strong>{{timeFormat(i.createTime)}}</strong></h4>
              <div class="typeBtm">
                <p>vin识别码：<span>{{i.param.vin}}</span></p>
              </div>
            </div>
          </div>
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { formatWithSeperator } from '@/utils/datetime'
import { format } from '@/utils/date'
import { baseUrl } from '@/utils/global'
import leftpic from '@/components/list/leftpic'
export default {
  name: 'browsing',
  components:{
    leftpic
  },
  data () {
    return {
      baseUrl,
      active: 0,
      loading: false,
      finished: false,
      columnFilters: {
        tableId: {
          "name": "tableId",
          "value": 1
        }
      },
      pageRequest: {
        pageSize: 15,
        pageNum: 1
      },
      pageNum: 0,
      resList: []
    }
  },
  methods:{
    changeOrder(a,b){
      this.pageNum = 0
      this.finished = false
      this.resList = []
    },
    // 请求全部特价车记录
    load(){
      let i = this.active + 1
      this.columnFilters.tableId.value = i
      this.pageRequest.columnFilters = this.columnFilters
      this.pageRequest.pageNum = ++ this.pageNum
      console.log(this.pageRequest)
      this.$api.user.memberFindPage(this.pageRequest).then(res=>{
        this.loading = false
        if(res.data.content.length < this.pageRequest.pageSize){
          this.finished = true
        }
        if(i == 3){
          res.data.content.forEach(i => {
            i.picture = i.picture.split(' ')[0]
          })
        }
        if(i == 4){
          res.data.content.forEach(item => {
            item.param = JSON.parse(item.param)
            console.log(i.type, item.param)
          })
        }
        this.resList = res.data.content
      })
    },
    // 格式化时间
    timeFormat(time){
      return formatWithSeperator(time, '-', ':')
    },
    // 格式化时间
    dateFormat(time){
      return format(time)
    }
  },
  mounted(){
    this.$store.commit('changeTitle','我的订单')
  }
}
</script>

<style scoped lang="scss">
.browsing{
  height: 100%;
  // overflow-y: auto;
}
.type1{
  display: flex;
  justify-content: space-between;
  padding: .4rem;
  border-bottom: .026667rem solid #f2f5f7;
  img{
    height: 2.333333rem;
    width: 3rem;
    margin-right: .4rem;
  }
  div{
    font-size: .43rem;
    flex: 1;
    position: relative;
    p{
      margin-top: .2rem;
    }
    span{
      font-size: .213333rem;
      color: #999;
      position: absolute;
      bottom: 0;
    }
  }
}
.type3{
  margin-right: 0;
  margin-left: .4rem;
}
.moreType{
  border-radius:.266667rem;
  box-shadow: 0 -0.01rem 0.2rem 0 rgba(0,0,0,0.19);
  margin-top: .426667rem;
  h4{
    color: #4771E6;
    border-bottom: .026667rem solid #F2F4F7;
    font-size: .32rem;
    line-height: .733333rem;
    display: flex;
    justify-content: space-between;
    strong{
      color: #999;
    }
  }
  &>div{
    padding-bottom: .4rem;
    &>*{
      padding: 0 .333333rem;
    }
  }
}
.type4{
  h5{
    font-weight: bold;
    font-size: .426667rem;
    line-height: 1rem;
  }
  b{
    color: #b3b3b3;
    font-size: .32rem;
    margin-bottom: .4rem;
    margin-right: .1rem;
    span{
      color: #4771E6;
    }
  }
}
.type7{
  .typeBtm{
    display: flex;
    justify-content: space-around;
    font-size: .426667rem;
    text-align: center;
    color: #333;
    margin-top: .4rem;
    font-weight: bold;
    span{
      font-size: .32rem;
      color: #999;
    }
  }
}
.type9{
  font-size: .4rem;
  color: #999;
  font-weight: bold;
  line-height: .666667rem;
  .typeBtm{
    margin-top: .4rem;
  }
  span{
    color: #333;
  }
}
</style>
<style scoped>
>>> .van-tabs__content{
  height: calc(100% - 60px)
}
>>> .van-tab{
  flex: none;
  padding: 0 .4rem;
}
</style>