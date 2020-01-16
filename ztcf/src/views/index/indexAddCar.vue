<template>
    <div class="indexAddCar t600">
        <img :src="require('@/assets/index/indexTop.png')" class="topBg" alt="">
        <div class="box container shadow">
            <div>
                <div v-if="true" class="sao" :class="{ isUpper }">
                    <img :src="require('@/assets/index/addCar/saoyisao.png')" alt="">
                    <span>识别行驶证</span>
                    <up-img @before-delete="beforeDelete" @getfile="drivingPermit"></up-img>
                </div>
                <div class="xinghao" @click="toInsureAdd">
                    <b class="t600">车辆型号:</b>
                    <p class="t600" :style="!carData.carBrand?{color: '#b3b3b3'}:{color: '#333'}">
                    <strong>{{!carData.carBrand?'请选择车辆型号':carData.carBrand}}</strong>
                    <span>></span></p>
                </div>
                <div class="chepai">
                    <b>车牌号:</b>
                    <div>
                    <label class="l1" @click="show = true">
                        <span>{{carData.zi}}</span>
                        <img :src="require('@/assets/insurance/down.png')" alt="">
                    </label>
                    <p class="t600" :style="carData.ifCarNumber?{color: '#b3b3b3'}:{color: '#333'}">
                        <input name="num" :disabled="carData.ifCarNumber" type="text" placeholder="请输入车牌号码" v-model="carData.num" @change="getByteLen" @input="input" ref="input">
                    </p>
                    <label class="l2" @click="changeshangpai"><img :src="!carData.ifCarNumber?require('@/assets/no.png'):require('@/assets/yes.png')" alt="">未上牌</label>
                    </div>
                </div>
                <div class="bottom" v-if="showBtm">
                    <div class="xinghao">
                        <b class="t600">注册时间:</b>
                        <p class="t600" style="color: #333">
                        <strong contenteditable="plaintext-only">{{!carData.regDate?'':carData.regDate}}</strong></p>
                    </div>
                    <div class="xinghao">
                        <b class="t600">发动机号:</b>
                        <p class="t600" style="color: #333">
                        <strong contenteditable="plaintext-only">{{carData.engineNumber?carData.engineNumber:''}}</strong></p>
                    </div>
                    <div class="xinghao">
                        <b class="t600">车架号:</b>
                        <p class="t600" style="color: #333">
                        <strong contenteditable="plaintext-only">{{carData.frameNumber}}</strong></p>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: `${400 / 75}rem` }">
            <van-picker :default-index="15" :columns="columns" @change="onChange" class="xuanze"/>
        </van-popup>
        <btn @click="subAdd" :style="btnStyle" name="确认添加"></btn>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
import upImg from '@/components/input/upImg'
export default {
    name: 'indexAddCar',
    components:{
        btn,
        upImg
    },
    data () {
        return {
            checked: false,
            isUpper: false,
            carData: {
                carBrand: '',
                zi: '豫',
                num: '',
                ifCarNumber: false, //false 未上牌  true 上牌
                regDate: '',
                engineNumber: '',
                frameNumber: ''
            },
            show: false,
            btnStyle: {
                bottom: `${40 / 75}rem`,
                position: 'fixed',
                left: 0,
                right: 0,
                margin: 'auto'
            },
            showBtm: false,
            columns: ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新'],
            subData: {}
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
            this.carData.ifCarNumber = !this.carData.ifCarNumber;
        },
        // 监听输入框改变
        input(a) {
            var input = this.$refs.input;
            let res = this.getByteLen(input.value).toUpperCase()
            this.$set(this.carData, 'num', res)
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
            this.carData.zi = value
        },
        // 跳转添加车辆
        toInsureAdd(){
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
        },
        // 添加车辆
        subAdd(){
            this.subData = {
                "brandId": this.brandId, // 品牌ID
                "twoBrandId": this.twoBrandId, // 二级品牌ID
                "vehicleId": this.vehicleId, // 车型id
                "carId": this.carId, // 车ID
                "carName": this.carName, // 车辆名称
                "ifCarNumber": "", // 1已经上牌 0未上牌
                "carNumberPrefix": "", // 车牌前缀
                "carNumber": "", // 车牌号
                "carType": "string", // 车辆类型
                "createDate": "", // 添加时间
                "enable": 1, // 是否可用
                "engineNumber": "string", // 发动机号
                "frameNumber": "string", // 车辆识别码
                "id": 0,
                "ifTransfer": 0, // 是否过户
                "transferDate": "", // 过户时间
                "memberId": 0, // 会员ID
                "permit": 0, // 行驶证id
                "playingDate": "", // 上牌年份
            }
            if(!this.carData.ifCarNumber){ // 如果已上牌
                this.subData.carNumberPrefix = this.carData.zi
                this.subData.carNumber = this.carData.num
                this.subData.ifCarNumber = '1'
            }else{
                this.subData.carNumberPrefix = ''
                this.subData.carNumber = ''
                this.subData.ifCarNumber = '0'
            }
            this.subData.engineNumber = this.carData.engineNumber
            this.subData.frameNumber = this.carData.frameNumber
            this.subData.carType = this.carData.carType
            this.subData.memberId = this.userData.id
            console.log(this.subData)
            this.$api.user.saveMemberCarInfo(this.subData).then(res=>{
                console.log(res)
                if(res.code == 200){
                    let _this = this
                    this.Toast({
                        message: '添加成功',
                        onOpened(){
                            localStorage.getuser = '1'
                            _this.$router.push('/index')
                        }
                    })
                }else{
                    this.Toast.fail(res.msg)
                }
            })
        },
        // 上传图片
        drivingPermit(res){
            console.log(res)
            if(res.data.code == 200){
                this.isUpper = true
                this.showBtm = true
                if(res.data.data.carNumber != ''){
                    let zi = res.data.data.carNumber.slice(0, 1),
                        num = res.data.data.carNumber.slice(1);
                    this.$set(this.carData, 'zi', zi)
                    this.$set(this.carData, 'num', num)
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
        }
    },
    activated(){
        this.$store.commit('changeTitle','添加车辆')
        if(this.carName){
            this.$set(this.carData, 'carBrand', this.carName)
        }
        console.log(this.userData)
    },
    computed:{
        userData(){
            let data = this.$store.getters.userData
            return Object.assign({}, data)
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
    }
}
</script>

<style scoped lang="scss">
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
        img{
            display: block;
            width: .373333rem;
            height: .373333rem;
            margin-right: .2rem;
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
        }
        .xinghao{
            height: .666667rem;
            display: flex;
            line-height: .666667rem;
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
</style>