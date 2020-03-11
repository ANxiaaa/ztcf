<template>
    <div class="zMap">
        <div class="amap-demo" id="amap"></div>
    </div>
</template>

<script>
export default {
    name: 'zMap',
    props: {
    },
    data(){
        return {
            markers: [],
            map: null,
        }
    },
    methods: {
        // 自适应点
        setFitView(){
            this.map.setFitView()
        },
        // 添加点
        addMark(position, data){
            console.log(position, data)
            var marker;
            marker = new AMap.Marker({
                icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_bs.png",
                position,
                offset: new AMap.Pixel(-10, -30)
            });
            marker.data = data
            marker.on('click', function(e){
                console.log('点击marker', e)
            })
            marker.setMap(this.map);
        },
        // 加载地图
        amapLoad(){
            let _this = this
            _this.map = new AMap.Map('amap',{
                zoom:11,//级别
                resizeEnable: true
            });
            AMap.plugin('AMap.Geolocation', function() {
                var geolocation = plus.geolocation
                geolocation.getCurrentPosition(function(p){
                    console.log(p)
                    let lnglatArr = [p.coords.longitude, p.coords.latitude]
                    var lng = p.coords.longitude
                    var lat = p.coords.latitude
                    var position = [lng, lat]
                    console.log(position)
                    var m1 = new AMap.Marker({
                        position,
                        offset: new AMap.Pixel(-12, -12),
                        icon: "https://webapi.amap.com/theme/v1.3/markers/n/loc.png"
                    });
                    _this.map.add(m1);
                    _this.map.setZoomAndCenter(14, position);
                    _this.$emit('positionSuccess', {lng, lat})
                }, function(e){
                    alert('Geolocation error: ' + e.message);
                },{
                    provider:'amap',
                    enableHighAccuracy: true,
                    timeout: 10000,
                    coordsType: 'wgs84'
                });
            })
        }
    },
    mounted(){
        this.amapLoad()
    }
}
</script>

<style scoped lang="scss">
.zMap{
    #amap{
        width: 100%;
        height: 7.8rem;
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