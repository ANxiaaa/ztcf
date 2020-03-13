<template>
    <div class="indextcccx t600">
        <z-map ref="zmap" @positionSuccess="positionSuccess"></z-map>
        <div class="wrap">
            <div class="loading" v-if="loading">
                <van-loading color="#1989fa">加载中...</van-loading>
            </div>
            <div v-else>
                <h6 v-show="resData.length == 0">没有附近停车场信息</h6>
                <ul v-show="resData.length != 0" class="oliList">
                    <li @click="clickList(i)" v-for="(i,index) in resData" :key="index + 'oli'">
                        <p class="name"><b>{{i.name}}</b><strong>{{i.type}}</strong><span>1.1km</span></p>
                        <p class="address">{{i.address}}</p>
                        <p class="residue">剩余<span>{{i.leftnum}}</span>个，共<span>{{i.num}}</span>个车位</p>
                    </li>
                </ul>
            </div>
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
            showItem: false,
            pageNum: 0
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
        // 点击列表
        clickList(i){
            console.log(i)
            this.$refs.zmap.changeMark(i.id)
        },
        // 定位成功
        positionSuccess(position){
            let { lat, lng } = position
            this.$api.apisearch.parkingQueryNearby({ distance: 1000, lat, lng }).then(async res=>{
                if(res.code == 200){
                    console.log(res, position)
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
                this.loading = false
                this.Toast.fail(err.msg)
            })
        }
    },
    mounted(){
        this.$store.commit('changeTitle','停车场查询')
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
        overflow-y: auto;
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
h6{
    font-size: .5rem;
    text-align: center;
    margin-top: .4rem;
}
</style>