<template>
    <div class="indexkdcx t600">
        <img :src="require('@/assets/index/indexTop.png')" class="topBg" alt="">
        <div class="cxBox">
            <div class="xinghao">
                <b class="t600">快递单号:</b>
                <p class="t600" style="color:#333">
                    <input type="text" v-model="cxData.number">
                </p>
            </div>
            <div class="xinghao">
                <b class="t600">快递公司:</b>
                <p class="t600" style="color:#333" @click="change">
                    <strong></strong>
                <span>></span></p>
            </div>
            <btn @click="subData" name="查询"></btn>
        </div>
        <div class="resData" v-if="showres">
            <h6>查询结果</h6>
            <h5 v-if="err">您所查的物流单号目前还未有任何显示</h5>
            <div v-else>
                <van-steps active-color="#4771E6" direction="vertical" :active="0">
                    <van-step v-for="(i, index) in resData.result.list" :key="index">
                        <h3>{{i.status}}</h3>
                        <p>{{i.time}}</p>
                    </van-step>
                </van-steps>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: `${400 / 75}rem` }">
            <!-- <van-picker :default-index="15" :columns="columns" @change="onChange" class="xuanze"/> -->
        </van-popup>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
    name: 'indexkdcx',
    components:{
        btn,
    },
    data () {
        return {
            show: false,
            showres: false,
            err: true,
            cxData: {
                number: '',
                phone4: '',
                type: ''
            },
            resData: {
                msg: "ok",
                result: {
                    deliverystatus: 2,
                    issign: 0,
                    list: [
                        {time: "2020-01-14 14:10:48", status: "河南郑州公司主语城分部进行派件扫描；派送业务员：申亚涛；联系电话：17335771901"},
                        {time: "2020-01-14 13:56:19", status: "河南郑州公司主语城分部到达目的地网点，快件很快进行派送"},
                        {time: "2020-01-14 12:31:01", status: "河南郑州公司进行快件扫描，发往：河南郑州公司主语城分部"},
                        {time: "2020-01-14 07:43:50", status: "河南郑州公司到达目的地网点，快件很快进行派送"},
                        {time: "2020-01-14 07:38:15", status: "河南郑州分拨中心从站点发出，本次转运目的地：河南郑州公司"},
                        {time: "2020-01-14 07:37:42", status: "河南郑州分拨中心在分拨中心进行卸车扫描"},
                        {time: "2020-01-12 03:21:32", status: "浙江宁波分拨中心进行装车扫描"},
                        {time: "2020-01-12 02:03:58", status: "浙江宁波分拨中心进行中转集包扫描，发往：河南郑州公司"},
                        {time: "2020-01-12 01:19:34", status: "浙江宁波分拨中心在分拨中心进行称重扫描"},
                        {time: "2020-01-11 15:03:28", status: "浙江宁波江北区洪塘公司进行揽件扫描"},
                    ],
                    logo: "https://api.jisuapi.com/express/static/images/logo/80/yunda.png",
                    number: "4303503177786",
                    type: "yunda",
                    typename: "韵达快运",
                },
                status: 0
            }
        }
    },
    methods:{
        // 点击反馈
        down(a){
            a.target.style.background = '#073694'
        },
        up(a){
            a.target.style.background = '#2E6BE6'
        },
        // 查询
        subData(){
            console.log(this.cxData)
            this.$api.apisearch.queryExpress(this.cxData).then(res=>{
                console.log(res)
                this.showres = true
                if(res.data != null){
                    this.err = false
                }else{
                    this.err = true
                }
            })
        },
        // 选择快递公司
        change(){
            this.show = true
        }
    },
    mounted(){
        this.$store.commit('changeTitle','快递查询')
        console.log(this.resData)
    },
    computed:{
    }
}
</script>

<style scoped lang="scss">
.indexkdcx{
    position: relative;
    padding-top: .8rem;
    .topBg{
        width: 100%;
        height: 2.773333rem;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .cxBox{
        width: 9.2rem;
        margin: auto;
        border-radius:.266667rem;
        background: #fff;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.19);
        padding: .06rem .4rem;
        input{
            flex: 1;
            background: none;
            border: none;
            height: 100%;
            font-weight: bold;
        }
    }
    b{
        font-size: .4rem;
        color: #999999;
    }
    .xinghao{
        height: .666667rem;
        display: flex;
        line-height: .666667rem;
        margin: .4rem 0;
        p{
            font-size:.373333rem;
            font-weight: 500;
            position: relative;
            flex: 1;
            line-height: .62rem;
            margin-left: .1rem;
            border-bottom: .013333rem solid #F2F4F7;
            white-space: pre;
            display: flex;
            strong{
                margin-right: .5rem;
                width: 6rem;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            span{
                font-family: '宋体';
                font-weight: bold;
                color: #999;
                position: absolute;
                right: 0;
            }
        }
    }
    button{
        margin: 1rem auto .733333rem;
    }
    .resData{
        width: 10rem;
        margin: .4rem auto;
        padding: 0 .8rem;
        color: #999;
        h6{
            font-size: .373333rem;
            line-height: 1rem;
            font-weight: bold;
        }
        h5{
            color: #D95A41;
            font-size: .32rem;
            line-height: .6rem;
        }
        h3{
            font-weight: bold;
        }
        p{
            font-weight: normal;
        }
    }
}
</style>