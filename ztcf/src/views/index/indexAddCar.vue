<template>
    <div class="indexAddCar t600">
        <img v-if="!storeCarId" :src="require('@/assets/index/indexTop.png')" class="topBg" alt="">
        <div v-if="storeCarId" class="card">
            <div class="defultCar">
                <b>默认车辆</b>
                <van-switch :size="`${40 / 75}rem`" v-model="checked"/>
            </div>
        </div>
        <div class="box container shadow">
            <div>
                <div @click="showupBOX = true" class="sao" :class="{ isUpper }">
                    <img class="saomiao" :src="require('@/assets/index/addCar/saoyisao.png')" alt="">
                    <span>识别行驶证</span>
                    <img class="showRes" v-if="isUpper" :src="base64" alt="">
                    <!-- <up-img @before-delete="beforeDelete" @getfile="drivingPermit"></up-img> -->
                </div>
                <div class="xinghao" @click="toInsureAdd">
                    <b class="t600">车辆型号:</b>
                    <p class="t600" :style="!carData.carBrand && !carData.carName ? {color: '#b3b3b3'} : {color: '#333'} ">
                    <strong style="flex: 1">{{!carData.carBrand && !carData.carName ? '请选择车辆型号' : carData.carBrand || carData.carName}}</strong>
                    <van-icon name="arrow" size=".4rem" color="#b3b3b3"/></p>
                </div>
                <div class="chepai">
                    <b>车牌号:</b>
                    <div>
                    <label class="l1" @click="qianzhui">
                        <span>{{carData.carNumberPrefix}}</span>
                        <img :src="require('@/assets/insurance/down.png')" alt="">
                    </label>
                    <p class="t600" :style="ifCarNumber?{color: '#b3b3b3'}:{color: '#333'}">
                        <input name="num" :disabled="ifCarNumber" type="text" placeholder="请输入车牌号码" v-model="carData.carNumber" @change="getByteLen" @input="input" ref="input">
                    </p>
                    <label class="l2" @click="changeshangpai"><img :src="!ifCarNumber?require('@/assets/no.png'):require('@/assets/yes.png')" alt="">未上牌</label>
                    </div>
                </div>
                <div class="bottom">
                    <div class="xinghao">
                        <b class="t600">发动机号:</b>
                        <p class="t600" style="color: #333">
                            <input type="text" v-model="carData.engineNumber">
                        </p>
                    </div>
                    <div class="xinghao">
                        <b class="t600">车架号:</b>
                        <p class="t600" style="color: #333">
                            <input type="text" v-model="carData.frameNumber">
                        </p>
                    </div>
                </div>
                <div v-show="carId" class="bottom">
                    <!-- <div @click="changeregDate" class="xinghao">
                        <b class="t600">注册时间:</b>
                        <p class="t600" style="color: #333">
                            <strong>{{timeFormat(carTime)}}</strong>
                            <van-icon name="arrow" size=".4rem" color="#b3b3b3"/>
                        </p>
                    </div> -->
                    <!-- <div @click="changeAttr" class="xinghao">
                        <b class="t600">车辆属性:</b>
                        <p class="t600" style="color: #333">
                            <strong>{{timeFormat(carTime)}}</strong>
                            <van-icon name="arrow" size=".4rem" color="#b3b3b3"/>
                        </p>
                    </div> -->
                </div>
            </div>
        </div>
        <van-popup class="showupBox" v-model="showupBOX" round position="bottom">
            <van-button @click="showCamara" type="default">拍照</van-button>
            <van-button @click="showAlbum" type="default">从相册选择</van-button>
        </van-popup>
        <van-popup v-model="show" round position="bottom" :style="{ height: `${400 / 75}rem` }">
            <van-picker v-if="showxuanze" :default-index="defaultIndex" :columns="columns" @change="onChange" class="xuanze"/>
            <van-datetime-picker @change="showregTime" v-else :show-toolbar="false" v-model="carTime" type="date" :min-date="minDate" :max-date="maxDate"/>
        </van-popup>
        <div class="bottomBox">
            <btn v-if="storeCarId" @click="delCar" startColor="#fafafa" endColor="#fff" :style="btnStyle" name="删除"></btn>
            <btn @click="subAdd" name="保存车辆"></btn>
        </div>
        <img :src="imgurl" alt="">
    </div>
</template>

<script>
import btn from '@/components/input/btn'
import upImg from '@/components/input/upImg'
import { upLoaderImg } from '@/http/upImg'
import { baseUrl } from '@/utils/global'
export default {
    name: 'indexAddCar',
    components:{
        btn,
        upImg
    },
    data () {
        return {
            baseUrl,
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 11, 31),
            showxuanze: true,
            showupBOX: false,
            checked: false,
            btnStyle: {
                color: '#b3b3b3',
                background: '#fff',
                border: '.026667rem solid #b3b3b3'
            },
            carTime: new Date(),
            isUpper: false,
            carData: {
                "brandId": '', // 品牌ID
                "twoBrandId": '', // 二级品牌ID
                "vehicleId": '', // 车型id
                "carId": '', // 车ID
                "carName": '', // 车辆名称
                "ifCarNumber": "", // 1已经上牌 0未上牌
                "carNumberPrefix": "豫", // 车牌前缀
                "carNumber": "", // 车牌号
                "carType": "", // 车辆类型
                "createDate": "", // 添加时间
                "enable": 1, // 是否可用
                "engineNumber": "", // 发动机号
                "frameNumber": "", // 车辆识别码
                "id": 0,
                "ifTransfer": 0, // 是否过户
                "transferDate": "", // 过户时间
                "memberId": 0, // 会员ID
                "permit": 0, // 行驶证id
                "playingDate": "", // 上牌年份
            },
            show: false,
            showBtm: false,
            columns: [],
            subData: {},
            imgurl: '',
            base64: '',
            ifCarNumber: false,
            defaultIndex: 0
        }
    },
    methods:{
        //压缩图片
		compressImage(url,filename,divid){
            let _this = this
			var name="_doc/upload/"+divid+"-"+filename;
			plus.zip.compressImage({
					src:url,
					dst:name,
					quality:60,
					overwrite:true
				},
				function(event) {
					var path = name;
					_this.saveimage(event.target,divid,filename,path);
				},function(error) {
					plus.nativeUI.toast("压缩图片失败，请稍候再试");
			});
        },
        // 点击反馈
        down(a){
            a.target.style.background = '#073694'
        },
        up(a){
            a.target.style.background = '#2E6BE6'
        },
        // 限制长度
        getByteLen(val) {
            let len = 0;
            let res = '';
            for (let i = 0; i < val.length; i++) {
                let a = val.charAt(i);
                if (!/.*[\u4e00-\u9fa5]+.*$/.test(a) && !/\s+/.test(a)) {
                if(len >= 6){
                    break
                }
                len ++;
                res += val[i]
                }
            }
            return res;
        },
        // 改变是否上牌
        changeshangpai(){
            this.ifCarNumber = !this.ifCarNumber;
        },
        // 监听输入框改变
        input(a) {
            var input = this.$refs.input;
            let res = this.getByteLen(input.value).toUpperCase()
            this.$set(this.carData, 'carNumber', res)
            // 如果车牌号长度等于 6 查询
            if(res.length === 6){
                // 查询保险过期时间接口, 成功了返回对应时间
                this.showTime = true
            }else{
                this.showTime = false
            }
        },
        // 更改字
        onChange(picker, value, index) {
            this.carData.carNumberPrefix = value
        },
        // 跳转添加车辆
        toInsureAdd(){
            if(this.allCar.length){
                this.$router.push('/indexOneBrand')
            }else{
                this.$api.carList.allOneCar().then(res=>{
                    console.log(res.data)
                    if(res.code == 200){
                        let arr = []
                        res.data.forEach(i=>{
                            arr.push(i.initial)
                        })
                        let indexList = [...new Set(arr)].sort()
                        console.log(indexList)
                        this.$store.commit('changeAllCar',res.data)
                        this.$store.commit('changeAllIndexList',indexList)
                        this.$router.push('/indexOneBrand')
                    }else{
                        this.Toast.fail('获取失败, 请重试!')
                    }
                })
            }
        },
        // 点击相册
        showAlbum(){
            let _this = this
            plus.gallery.pick(function(path){
                console.log(path);
                _this.upImg(path)
            }, function ( e ) {
                console.log( "取消选择图片" );
            }, {filter: "image"} );
        },
        // 添加车辆
        subAdd(){
            if(this.checked == true){
                this.$api.user.defaultMemberCarInfoByMemberId(this.carId).catch(e=>{
                    this.Toast.fail('修改默认车辆失败!')
                })
            }
            this.subData = Object.assign(this.carData, {
                "brandId": this.brandId, // 品牌ID
                "twoBrandId": this.twoBrandId, // 二级品牌ID
                "vehicleId": this.vehicleId, // 车型id
                "carId": this.carId, // 车ID
                "carName": this.carName, // 车辆名称
            })
            if(!this.ifCarNumber){ // 如果已上牌
                this.subData.carNumberPrefix = this.carData.carNumberPrefix
                this.subData.carNumber = this.carData.carNumber
                this.subData.ifCarNumber = '1'
            }else{
                this.subData.carNumberPrefix = ''
                this.subData.carNumber = ''
                this.subData.ifCarNumber = '0'
            }
            this.subData.memberId = this.userData.id
            console.log(this.subData)
            this.$api.user.saveMemberCarInfo(this.subData).then(res=>{
                console.log(res)
                if(res.code == 200){
                    let _this = this
                    this.Toast({
                        message: '保存成功',
                        onOpened(){
                            localStorage.getuser = '1'
                            _this.$router.go(-1)
                        }
                    })
                }else{
                    this.Toast.fail(res.msg)
                }
            })
        },
        // 删除车辆
        delCar(){
            let _this = this
            this.Dialog.confirm({
                title: '提示',
                message: '您确定要删除该车辆吗？'
            }).then(() => {
                this.$api.user.deleteMemberCarInfoByMemberId(this.storeCarId).then(res=>{
                    if(res.code == 200){
                        this.Toast({
                            message: '删除成功',
                            onOpened(){
                                localStorage.getuser = '1'
                                _this.$router.go(-1)
                            }
                        })
                    }else{
                        this.Toast.fail(res.msg)
                    }
                })
            })
        },
        // 选前缀
        qianzhui(){
            this.showxuanze = true
            this.show = true
            this.defaultIndex = 15
            this.columns = ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新']
        },
        // 选时间
        changeregDate(){
            this.showxuanze = false
            this.show = true
        },
        // 选属性
        changeAttr(){
            this.showxuanze = true
            this.show = true
        },
        // 格式化时间
        timeFormat(datetime){
            if (datetime != null) {
                let dateMat = new Date(datetime);
                let year = dateMat.getFullYear();
                let month = dateMat.getMonth() + 1;
                month = month < 10 ? '0' + month : month
                let day = dateMat.getDate();
                day = day < 10 ? '0' + day : day
                let hh = dateMat.getHours();
                hh = hh < 10 ? '0' + hh : hh
                let mm = dateMat.getMinutes();
                mm = mm < 10 ? '0' + mm : mm
                let ss = dateMat.getSeconds();
                ss = ss < 10 ? '0' + ss : ss
                let timeFormat = year + '年' + month + '月' + day + '日';
                return timeFormat;
            }
        },
        // 时间变化
        showregTime(){
            console.log(this.carTime)
        },
        // 上传
        upImg(filePath){
            let _this = this
            plus.io.resolveLocalFileSystemURL(filePath, function(entry) {
                console.log('entry', entry)
                _this.lodingShow = true;
                let reader = null
                entry.file(function(file) {
                    reader = new plus.io.FileReader(); // 文件系统中的读取文件对象，用于获取文件的内容
                    reader.readAsDataURL(file);
                    reader.onloadend = async function(e) {
                        let dataBase = 'data:image/png;base64' + e.target.result;
                        _this.base64 = dataBase
                        let imgfile = _this.dataURLtoFile(dataBase, 'up.jpeg')
                        console.log(imgfile)
                        return await upLoaderImg(imgfile, baseUrl + '/member/spotDrivingPermit', 'post').then(res=>{
                            _this.drivingPermit(res)
                        })
                    },function (e) {
                        alert( e.message );
                    };
                });
            }, function(e) {
                plus.nativeUI.toast("读取拍照文件错误：" + e.message);
            });
        },
        // 点击拍照
        showCamara(){
            let _this = this;
            _this.showupBOX = false
            let camera = plus.camera.getCamera();
            camera.captureImage(
            function(filePath) {
                console.log('filePath', filePath)
                _this.upImg(filePath)
            },
            function() {
                alert("拍照失败");
            });
        },
        // 上传图片
        drivingPermit(res){
            console.log(res)
            console.log('shangchuan')
            if(res.status == 200){
                this.isUpper = true
                this.showBtm = true
                if(res.data.data.carNumber != ''){
                    let zi = res.data.data.carNumber.slice(0, 1),
                        num = res.data.data.carNumber.slice(1);
                    this.$set(this.carData, 'carNumberPrefix', zi)
                    this.$set(this.carData, 'carNumber', num)
                }
                if(res.data.data.regDate){
                    let str = res.data.data.regDate;
                    let regDate = `${str.slice(0,4)}年${str.slice(4,6)}月${str.slice(6,8)}日`
                    this.$set(this.carData, 'regDate', regDate)
                }
                if(res.data.data.engineNumber){
                    this.$set(this.carData, 'engineNumber', res.data.data.engineNumber)
                }
                if(res.data.data.frameNumber){
                    this.$set(this.carData, 'frameNumber', res.data.data.frameNumber)
                }
                if(res.data.data.carType){
                    this.$set(this.carData, 'carType', res.data.data.carType)
                }
            }
        },
        beforeDelete(){
            this.isUpper = false
        },
        //将base64转换为文件
        dataURLtoFile(dataurl, filename) {
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
    },
    mounted(){
        this.$store.commit('changeTitle','添加车辆')
    },
    activated(){
        if(this.$route.meta.re){
            this.checked = false
            this.carData = {
                "brandId": '', // 品牌ID
                "twoBrandId": '', // 二级品牌ID
                "vehicleId": '', // 车型id
                "carId": '', // 车ID
                "carName": '', // 车辆名称
                "ifCarNumber": "", // 1已经上牌 0未上牌
                "carNumberPrefix": "豫", // 车牌前缀
                "carNumber": "", // 车牌号
                "carType": "", // 车辆类型
                "createDate": "", // 添加时间
                "enable": 1, // 是否可用
                "engineNumber": "", // 发动机号
                "frameNumber": "", // 车辆识别码
                "isDefault": 0, // 车辆识别码
                "id": 0,
                "ifTransfer": 0, // 是否过户
                "transferDate": "", // 过户时间
                "memberId": 0, // 会员ID
                "permit": 0, // 行驶证id
                "playingDate": "", // 上牌年份
            }
        }
        if(this.$route.query.storeCarId != undefined){
            console.log(this.$route.query.storeCarId)
            this.userCarInfo.forEach(i => {
                if(i.id == this.$route.query.storeCarId){
                    console.log(2,i)
                    this.carData = Object.assign({}, i)
                    this.checked = Boolean(this.carData.isDefault)
                    this.$set(this.carData, 'carBrand', i.carName)
                    console.log(this.carData)
                }
            })
        }
        if(this.carName){
            this.$set(this.carData, 'carBrand', this.carName)
        }
    },
    computed:{
        userData(){
            let data = this.$store.getters.userData
            return Object.assign({}, data)
        },
        allCar(){
            let data = this.$store.getters.allCar
            return data
        },
        brandId(){
            if(this.$route.query.brandId){
                return this.$route.query.brandId
            }else{
                return this.subData.brandId
            }
        },
        twoBrandId(){
            if(this.$route.query.twoBrandId){
                return this.$route.query.twoBrandId
            }else{
                return this.subData.twoBrandId
            }
        },
        vehicleId(){
            if(this.$route.query.vehicleId){
                return this.$route.query.vehicleId
            }else{
                return this.subData.vehicleId
            }
        },
        carId(){
            if(this.$route.query.carId){
                return this.$route.query.carId
            }else{
                return this.subData.carId
            }
        },
        carName(){
            if(this.$route.query.carName){
                return this.$route.query.carName
            }else{
                return this.subData.carName
            }
        },
        userCarInfo(){
            return this.$store.getters.userCarInfo
        },
        storeCarId(){
            return this.$route.query.storeCarId
        },
    }
}
</script>

<style scoped lang="scss">
.card{
    padding: .15rem .35rem;
    border-radius: .266667rem;
    box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.19);
    margin: 0 auto .5rem;
    width: 9.2rem;
    background: #fff;
}
.defultCar{
    display: flex;
    justify-content: space-between;
    align-items: center;
    b{
        font-size: .4rem;
        color: #b3b3b3;
        line-height: .75rem;
    }
}
.bottomBox{
    position: fixed;
    bottom: 0;
    left: 0;right: 0;padding: .4rem;
    display: flex;
    justify-content: center;
    button{
        margin: 0 .266667rem;
    }
}
.indexAddCar{
    position: relative;
    padding-top: .8rem;
    .sao{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #4771E6;
        font-size: .4rem;
        line-height: .8rem;
        margin-bottom: .3rem;
        position: relative;
        overflow: hidden;
        img.saomiao{
            display: block;
            width: .373333rem;
            height: .373333rem;
            margin-right: .2rem;
        }
        img.showRes{
            display: block;
            width: 100%;
            position: absolute;
        }
    }
    .topBg{
        width: 100%;
        height: 2.773333rem;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .box{
        padding: .4rem;
        b{
            font-weight: 500;
            color: #999;
            font-size:.4rem;
            white-space: pre;
        }
        label{
            white-space: pre;
        }
        .xinghao{
            input{
                background: none;
            }
            strong{
                flex: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                width: 6rem;
            }
            height: .666667rem;
            display: flex;
            line-height: .666667rem;
            justify-content: space-between;
            align-items: center;
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
                input{
                    width: 6rem;
                    display: block;
                    border: none
                }
            }
        }
        .chepai{
            margin-top: .4rem;
            display: flex;
            div{
                flex: 1;
                padding-left: .35rem;
                border-bottom: .013333rem solid #F2F4F7;
                display: flex;
                justify-content: space-between;
                line-height: .6rem;
                .l1{
                    img{
                        width: .266667rem;
                        height: .16rem;
                        vertical-align: super;
                    }
                }
                input{
                    flex: 1;
                    border: none;
                    height: .373333rem;
                    &::placeholder{
                        font-weight: 500;
                        color: #999;
                        font-family:PingFang SC;
                        font-size: .373333rem;
                    }
                }
                .l2{
                    display: flex;
                    img{
                        height: .32rem;
                        width: .32rem;
                        margin-top: .15rem;
                        margin-right: .1rem;
                    }
                }
            }
        }
    }
}
.bottom div{
    margin-top: .35rem;
}
.isUpper{
    height: 4.733333rem;
}
.showupBox{
    padding-bottom: 1.4rem;
    text-align: center;
    font-size: .373333rem;
    button{
        display: block;
        width: 100%;
        border: none;
        border-bottom: .013333rem solid #ececec;
        line-height: 1.4rem;
        height: auto;
    }
}
</style>