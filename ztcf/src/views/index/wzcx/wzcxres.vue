<template>
    <div class="wzcxres t600">
        <img class="topBG" :src="require('@/assets/index/indexTop.png')" alt="">
        <div class="topCar">
            <h5>{{resData.lsprefix}}{{resData.lsnum}}</h5>
            <p>
                <b>未处理 <span>{{resData.count}}</span></b>
                <b>扣分 <span>{{resData.totalscore}}</span></b>
                <b>罚款 <span>{{resData.totalprice}}</span></b>
            </p>
        </div>
        <div class="resData" v-for="(i, index) in resData.list" :key="index">
            <div class="time">
                <span>{{timeFormat(i.time)}}</span>
            </div>
            <div class="main">
                <p>
                    <img :src="require('@/assets/index/find/address.png')" alt="">
                    <span>{{i.address}}</span>
                </p>
                <p>
                    <img :src="require('@/assets/index/find/warn.png')" alt="">
                    <span>{{i.content}}</span>
                </p>
            </div>
            <div class="btm">
                <p>
                    <b>扣: <span>{{i.score}}分</span></b>
                </p>
                <p>
                    <b>罚款: <span>{{i.price}}分</span></b>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { formatWithSeperator } from '@/utils/datetime'
export default {
    name: 'wzcxres',
    methods:{
        // 点击反馈
        down(a){
            a.target.style.background = '#073694'
        },
        up(a){
            a.target.style.background = '#2E6BE6'
        },
        // 格式化时间
        timeFormat(time){
            return formatWithSeperator(time, '-', ':')
        }
    },
    mounted(){
        this.$store.commit('changeTitle','违章查询')
        console.log(this.resData)
    },
    computed:{
        resData(){
            let data = this.$store.getters.wzcxData
            return data
        }
    }
}
</script>

<style scoped lang="scss">
.wzcxres{
    height: 100%;
    overflow-y: auto;
    position: relative;
    padding-top: .8rem;
    .topBG{
        width: 100%;
        height: 2.773333rem;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .topCar{
        height: 2.4rem;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.19);
        padding: .4rem;
        h5{
            font-weight: bold;
            font-size: .426667rem;
            line-height: 1rem;
        }
        b{
            color: #b3b3b3;
            font-size: .32rem;
            margin-right: .1rem;
            span{
                color: #4B74E7;
            }
        }
    }
    &>div{
        border-radius:.266667rem;
        background: #fff;
        width: 9.2rem;
        margin: auto;
    }
    .resData{
        height: 3.866667rem;
        margin-top: .533333rem;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(128, 128, 129, 0.1);
        .time{
            height: .973333rem;
            border-bottom: .026667rem solid #F2F4F7;
            padding: .266667rem .333333rem;
            color: #999999;
        }
        .main{
            border-bottom: .026667rem solid #F2F4F7;
            padding: .3rem .333333rem;
            font-size:.373333rem;
            color: #333333;
            line-height: .65rem;
            height: 1.906667rem;
            p{
                display: flex;
                align-items: center;
            }
            img{
                height: .373333rem;
                width: .373333rem;
                margin-right: .2rem;
            }
        }
        .btm{
            padding: .266667rem .333333rem;
            display: flex;
            p{
                width: 2rem
            }
        }
    }
}
</style>