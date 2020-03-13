<template>
    <div class="indextcccx t600">
        <z-map ref="zmap" @positionSuccess="positionSuccess"></z-map>
        <div class="wrap">
            <div class="loading" v-if="loading">
                <van-loading color="#1989fa">加载中...</van-loading>
            </div>
            <ul class="oliList" v-else>
                <li v-for="(i,index) in resData" :key="index + 'oli'">
                    <p class="name"><b>{{i.name}}</b><strong>{{i.type}}</strong><span>1.1km</span></p>
                    <p class="address">{{i.address}}</p>
                    <p class="residue">剩余<span>{{i.leftnum}}</span>个，共<span>{{i.num}}</span>个车位</p>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
import { bdtogd } from '@/utils/mapPos'
import { gdtobd } from '@/utils/mapPos'
import zMap from '@/components/map/zMap'
export default {
    name: 'indextcccx',
    components:{
        btn,
        zMap
    },
    data () {
        let self = this;
        return {
            loading: true,
            resData: [],
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
        // 定位成功
        positionSuccess(position, address){
            let addresses = address.addresses;
            if(addresses.indexOf('(') != -1){
                addresses = addresses.slice(0, addresses.indexOf('('))
            }
            let data = {
                address: addresses,
                city: address.address.city
            }
            console.log('data', data)
            this.$api.apisearch.queryBusNearby(data).then(async res=>{
                if(res.code == 200){
                    console.log(res)
                    this.loading = false
                    this.resData = res.data
                    this.resData.forEach(i=>{
                        let bd = bdtogd(i.lng, i.lat)
                        let olimarker = [bd.lng, bd.lat]
                        this.$refs.zmap.addMark(olimarker, i)
                    })
                    await this.$refs.zmap.setFitView()
                }
            }).catch(err => {
                console.log(err)
                this.err = res.msg
            })
        }
    },
    mounted(){
        this.$store.commit('changeTitle','公交查询')

        // let data = {
        //     address: '河南省郑州市金水区商务东四街28号靠近郑州银行',
        //     city: '郑州市'
        // }
        // let lat = 34.768846, lng = 113.733567

        // this.$api.apisearch.queryBusNearby(data).then(async res=>{
        //     if(res.code == 200){
        //         console.log(res)
        //         this.loading = false
        //         this.resData = res.data
        //         this.resData.forEach(i=>{
        //             let bd = bdtogd(i.lng, i.lat)
        //             let olimarker = [bd.lng, bd.lat]
        //             this.$refs.zmap.addMark(olimarker, i)
        //         })
        //         await this.$refs.zmap.setFitView()
        //     }
        // }).catch(err => {
        //     console.log(err)
        //     this.err = res.msg
        // })
    },
    created(){
    },
    computed:{
    }
}
</script>

<style scoped lang="scss">
.indextcccx{
    position: relative;
    height: 100%;
    .wrap{
        position: absolute;
        top: 6.133333rem;left: 0;right: 0;bottom: 0;
        background: #fff;
        z-index: 99;
        padding-top: .4rem;
        border-top-right-radius: .8rem;
        border-top-left-radius: .8rem;
        box-shadow:0 -.266667rem .466667rem 0 rgba(0, 0, 0, 0.19);
    }
    .loading{
        text-align: center;
        line-height: 3rem;
    }
    .oliList{
        padding: 0 .4rem;
        li{
            border-bottom: .026667rem solid #F2F4F7;
            padding: .4rem .2rem;
            .name{
                font-size: .373333rem;
                color: #333;
                display: flex;
                justify-content: space-between;
                span{
                    font-size: .32rem;
                    color: #999
                }
                b{
                    // overflow-x: auto;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: pre;
                }
                strong{
                    white-space: pre;
                    margin: 0 .3rem;
                    font-size: .266667rem;
                    padding: .066667rem .1rem;
                    color: #4771E6;
                    background:rgba(71,113,230,.2);
                    border-radius:.053333rem;
                }
            }
            .address{
                font-size: .32rem;
                color: #999;
                line-height: .7rem;
            }
            .residue{
                font-size: .293333rem;
                color: #b3b3b3;
                span{
                    color: #4771E6;
                }
            }
        }
    }
}
</style>