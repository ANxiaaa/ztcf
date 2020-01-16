<template>
    <div class="indextcccx t600">
        <!-- <el-amap vid="amap" :plugin="plugin" class="amap-demo" :center="center" :zoom="zoom">
            <el-amap-circle-marker v-for="(marker, index) in markers" :key="index + 'mark'" :center="marker.center" :radius="marker.radius" :fill-color="marker.fillColor" :fill-opacity="marker.fillOpacity" :events="marker.events"></el-amap-circle-marker>
            <el-amap-marker v-for="(marker, index) in olimarkers" :key="index" :position="marker.position" :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="index"></el-amap-marker>
        </el-amap> -->
        <div id="map"></div>
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
import { AMapManager } from 'vue-amap'
import { bdtogd } from '@/utils/mapPos'
import { gdtobd } from '@/utils/mapPos'
import { location } from "@/utils/mapPos";
export default {
    name: 'indextcccx',
    components:{
        btn,
    },
    data () {
        let self = this;
        return {
            loading: true,
            lng: 0,
            lat: 0,
            err: '',
            zoom: 15,
            center: [121.59996, 31.197646],
            markers: [],
            olimarkers: [],
            resData: [],
            // plugin: [{
            //     AMapManager,
            //     pName: 'Geolocation',
            //     // noIpLocate: 1, // 禁止ip定位
            //     events: {
            //         init(o) {
            //             o.getCurrentPosition((status, result) => {
            //                 // 获取定位
            //                 console.log(location)
            //                 if (result && result.position) {
            //                     self.lng = result.position.lng;
            //                     self.lat = result.position.lat;
            //                     let gd = gdtobd(self.lng, self.lat)
            //                     let gdlng = gd.lng
            //                     let gdlat = gd.lat
            //                     self.center = [self.lng, self.lat]
            //                     self.loaded = true;
            //                     self.result=result;
            //                     if(result.addressComponent.city){
            //                         self.citys=result.addressComponent.city;
            //                     }else{
            //                         self.citys=result.addressComponent.province;
            //                     }
            //                     self.district=result.addressComponent.district;
            //                     self.$nextTick();
            //                     console.log(self.lng, self.lat)
            //                     // 定位完成之后 添加圆形
            //                     let marker = {
            //                         center: [self.lng, self.lat],
            //                         radius: 25,
            //                         strokeColor: '#4771E6',
            //                         strokeOpacity: 0,
            //                         fillColor: '#4771E6',
            //                         fillOpacity: .6,
            //                     }
            //                     self.markers.push(marker)
            //                     console.log(self.$route.path)
            //                     // 查询停车场站
            //                     if(self.$route.path == '/indextcccx'){
            //                         self.$api.apisearch.parkingQueryNearby({
            //                             distance: 5000,
            //                             lat: `${gdlat}`,
            //                             lng: `${gdlng}`,
            //                             test: true
            //                         }).then(res=>{
            //                             self.resData = res.data
            //                             self.loading = false
            //                             self.resData.forEach(i=>{
            //                                 let bd = bdtogd(i.lng, i.lat)
            //                                 console.log(bd)
            //                                 let olimarker = {
            //                                     position: [bd.lng, bd.lat]
            //                                 };
            //                                 self.olimarkers.push(olimarker);
            //                             })
            //                             if(res.code == 200){
            //                                 console.log(res)
            //                             }else{
            //                                 self.err = res.msg
            //                             }
            //                         })
            //                     }
            //                 }
            //             });
            //         }
            //     }
            // },{
            //     pName: 'ToolBar',
            //     liteStyle: true,
            //     position: 'RT'
            // }]
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
        loadMap() { // 定位获取你当下的地理位置信息
            this.map = new AMap.Map('map',{
                esizeEnable: true
            });
            let thit = this;
            AMap.plugin('AMap.Geolocation',function(){
                let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否高精度定位
                timeout: 10000, // 设置定位超时时间
                buttonOffset: new AMap.Pixel(10, 20),
                zoomToAccuracy: true,
                buttonPosition: 'RB' // 定位按钮的位置 RB表示右下
                })
                thit.map.addControl(geolocation)
                geolocation.getCurrentPosition(function(status,result){
                if(status=='complete'){
                    // thit.onComplete(result)
                    console.log('定位成功')
                }else{
                    // thit.onError(result)
                    console.log('定位失败')
                }
                });
            })
        },
    },
    mounted(){
        this.$store.commit('changeTitle','停车场查询')
        console.log(this.resData)
        console.log(this.aMap)
        console.log(location)
        // location.initMap()
        this.loadMap()
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
    .amap-demo{
        width: 100%;
        height: 7.8rem;
    }
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
<style scoped>
>>> .amap-copyright, >>> .amap-logo {
    display: none !important;
}
>>> .amap-geolocation-con{
    bottom: 2.2rem !important;
}
</style>