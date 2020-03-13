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
            position: []
        }
    },
    methods: {
        // 更改点选中
        changeMark(id){
            this.markers.forEach(i => {
                console.log(i.data.id == id)
                if(i.data.id == id){
                    this.upMark(i)
                }
            })
        },
        // 点变红
        upMark(marker){
            this.markers.forEach(i => {
                i.setIcon(require('@/assets/mapicon/markerDefault.png'))
            })
            //a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png
            this.map.panTo(marker.position)
            marker.setIcon(require('@/assets/mapicon/markerRed.png'))
        },
        // 自适应点
        setFitView(){
            this.markers.forEach(i => {
                i.setIcon(require('@/assets/mapicon/markerDefault.png'))
            })
            this.map.setFitView()
        },
        // 添加点
        addMark(position, data){
            let _this = this
            var marker;
            marker = new AMap.Marker({
                icon: require('@/assets/mapicon/markerDefault.png'),
                position,
                offset: new AMap.Pixel(-13, -30)
            });
            marker.data = data
            marker.position = position
            marker.on('click', function(e){
                _this.$emit('clickMark', data)
                _this.upMark(marker)
            })
            marker.setMap(this.map);
            this.markers.push(marker)
        },
        // 点击地图
        mapClick(e){
            console.log('点击地图')
            this.markers.forEach(i => {
                i.setIcon(require('@/assets/mapicon/markerDefault.png'))
            })
            this.$emit('clickMap')
            this.setFitView()
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
                    _this.position = position
                    console.log(position)
                    var m1 = new AMap.Marker({
                        position,
                        offset: new AMap.Pixel(-12, -12),
                        icon: "https://webapi.amap.com/theme/v1.3/markers/n/loc.png"
                    });
                    _this.map.add(m1);
                    _this.map.setZoomAndCenter(14, position);
                    _this.map.on('click', _this.mapClick)
                    _this.$emit('positionSuccess', {lng, lat}, p)
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