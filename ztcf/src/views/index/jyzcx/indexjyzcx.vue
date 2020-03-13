<template>
    <div class="indexjyzcx t600">
        <z-map ref="zmap" @clickMap="clickMap" @positionSuccess="positionSuccess" @clickMark="clickMark"></z-map>
        <div class="wrap">
            <div class="loading" v-if="loading">
                <van-loading color="#1989fa">加载中...</van-loading>
            </div>
            <div v-else>
                <h6 v-show="resData.length == 0">没有附近加油站信息</h6>
                <!-- v-show="!showItem" -->
                <ul v-show="resData.length != 0" class="oliList">
                    <li v-for="(i,index) in resData" @click="clickList(i)" :key="index + 'oli'">
                        <p class="name"><b>{{i.name}}</b><span>1.1km</span></p>
                        <p class="address">{{i.address}}</p>
                        <div>
                            <p><b>E92#</b><strong>6.15元/升</strong></p>
                            <p><b>E94#</b><strong>6.17元/升</strong></p>
                        </div>
                    </li>
                </ul>
                <!-- <div v-show="showItem" class="showItem">
                    showItem
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
import zMap from '@/components/map/zMap'
import { bdtogd } from '@/utils/mapPos'
import { gdtobd } from '@/utils/mapPos'
// import { location } from "@/utils/mapPos";
export default {
    name: 'indexjyzcx',
    components:{
        btn,
        zMap
    },
    data () {
        let self = this;
        return {
            loading: true,
            resData: [],
            showItem: false
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
        positionSuccess(position){
            let { lat, lng } = position
            this.$api.apisearch.queryNearby({ distance: 3000, lat, lng }).then(async res=>{
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
                this.loading = false
                this.Toast.fail(err.msg)
            })
        },
        // 点击点
        clickMark(data){
            console.log(data)
            this.showItem = true
        },
        // 点击地图
        clickMap(){
            this.showItem = false
        },
        // 点击列表
        clickList(i){
            console.log(i)
            this.$refs.zmap.changeMark(i.id)
        },
    },
    mounted(){
        this.$store.commit('changeTitle','加油站查询')
    },
    created(){
    },
    computed:{
    }
}
</script>

<style scoped lang="scss">
.indexjyzcx{
    position: relative;
    height: 100%;
    .wrap{
        position: absolute;
        top: 6.133333rem;left: 0;right: 0;bottom: 0;
        overflow-y: auto;
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
            }
            .address{
                font-size: .32rem;
                color: #999;
                line-height: .7rem;
            }
            div{
                display: flex;
                p{
                    margin-right: .333333rem;
                    display: flex;
                    border:.026667rem solid rgba(220,223,230,1);
                    border-radius:.053333rem;
                    overflow: hidden;
                    font-size: .266667rem;
                    b{
                        height: 100%;
                        background: #C4C6CC;
                        color: #fff;
                        margin-right: .1rem;
                        padding: .04rem .1rem;
                    }
                    strong{
                        color: #B3B3B3;
                        padding: .04rem;
                    }
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