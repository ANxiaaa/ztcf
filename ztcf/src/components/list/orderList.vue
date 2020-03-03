<template>
<div class="orderList">
    <div v-for="(i, index) in dataList" :key="index" class="orderBox">
        <div class="top">
            <b>订单编号 {{i.orderNo}}</b>
            <span>{{orderStatus(i.status)}}</span>
        </div>
        <div class="tjccenter" @click="click(i.id)">
            <div class="main">
                <div class="left">
                    <img :src="baseUrl + i.img" alt="">
                </div>
                <div class="right">
                    <div class="text">
                        <p class="name">奥迪A3系 2019款 1.5LTSFI豪华版</p>
                        <p class="price">
                            <b>¥4300万</b>
                            <s>¥20万</s>
                        </p>
                    </div>
                    <div style="margin-top: .3rem" class="text">
                        <p class="colorAttr">白</p>
                        <b class="numAttr">X1</b>
                    </div>
                </div>
            </div>
            <div style="text-align: right;" class="main fwf">
                <div class="left">
                    <p>服务费</p>
                </div>
                <div class="right">
                    <b>¥560</b>
                </div>
            </div>
        </div>
        <div class="bottom">
            <p>取消订单</p>
            <p>订单咨询</p>
            <p class="blue" @click="$router.push('/orderInfo')">立即付款</p>
        </div>
    </div>
</div>
</template>

<script>
import { baseUrl } from '@/utils/global'
export default {
    name: 'orderList',
    props: ['dataList', 'orderType'],
    data () {
        return {
            baseUrl
        }
    },
    methods: {
        // 点击反馈
        down(a){
            if(!this.bindtap)return;
            a.path.forEach(i=>{
                if(i.className === 'touch'){
                    i.style.background = '#ececec'
                }
            })
        },
        up(a){
            if(!this.bindtap)return;
            a.path.forEach(i=>{
                if(i.className === 'touch'){
                    i.style.background = 'none'
                }
            })
        },
        // 跳转
        click(id){
            // this.$router.push('/')
            // console.log(1)
            this.$router.push('/orderInfo?id=' + id)
        },
        // 订单状态
        orderStatus(a){
            let title;
            this.orderType.forEach(i => {
                if(i.name == a){
                    title = i.title
                }
            })
            return title
        },
    },
    mounted(){
        console.log(this.dataList)
    },
}
</script>

<style scoped lang="scss">
.orderList{
    .orderBox{
        padding: 0 .32rem;
        margin: 0 .4rem .533333rem;
        border-radius: .133333rem;
        background: #fff;
        margin-bottom: .32rem;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.19);
        .top{
            font-size: .32rem;
            line-height: .933333rem;
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #F2F4F7;
            b{
                color: #333
            }
            span{
                color: #AFB0B2;
            }
        }
        .tjccenter{
            margin-top: .32rem;
            border-bottom: 2px solid #F2F4F7;
            .fwf{
                font-size: .32rem;
                line-height: .9rem;
                color: #999;
            }
            .main{
                display: flex;
                justify-content: space-between;
                .left{
                    width: 2.4rem;
                    margin-right: .2rem;
                    img{
                        width: 2.4rem;
                        height: 1.8rem;
                        display: block;
                        background: #000;
                    }
                }
                .right{
                    flex: 1;
                    .text{
                        display: flex;
                        justify-content: space-between;
                        .name{
                            line-height: .533333rem;
                            flex: 1;
                            font-size: .373333rem;
                            height: 1rem;
                            color: #666666;
                            overflow: hidden;
                        }
                        .price{
                            line-height: .533333rem;
                            // width: 1.4rem;
                            margin-left: .4rem;
                            color: #666666;
                            text-align: right;
                            font-size: .32rem;
                            s{
                                font-size: .293333rem;
                                color: #999;
                                display: block;
                            }
                        }
                        .colorAttr{
                            color: #999;
                            font-size: .32rem;
                        }
                        .numAttr{
                            color: #999;
                            font-size: .32rem; 
                        }
                    }
                }
            }
        }
        .bottom{
            padding: .32rem 0;
            display: flex;
            justify-content: flex-end;
            p{
                width:2.24rem;
                height:.746667rem;
                border-radius: .373333rem;
                font-size: .373333rem;
                text-align: center;
                color: #999;
                line-height: .7rem;
                border:.026667rem solid currentColor;
                margin-left: .32rem;
            }
            .blue{
                color: #4771E6;
            }
        }
    }
}
</style>
