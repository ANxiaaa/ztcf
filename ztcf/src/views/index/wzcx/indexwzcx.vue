<template>
    <div class="indexwzcx t600">
        <img :src="require('@/assets/index/find/wzcxBG.png')" class="topBg" alt="">
        <div class="box container shadow">
            <div>
                <div v-if="true" class="sao" :class="{ isUpper }">
                    <img :src="require('@/assets/index/addCar/saoyisao.png')" alt="">
                    <span>识别行驶证</span>
                    <up-img @before-delete="beforeDelete" @getfile="drivingPermit"></up-img>
                </div>
                <div class="xinghao" @click="carType">
                    <b class="t600">车辆类型:</b>
                    <p class="t600" style="color: #333">
                    <strong>{{showtype}}</strong></p>
                </div>
                <div class="chepai">
                    <b>车牌号:</b>
                    <div>
                    <label class="l1" @click="show = true;showpic = 1">
                        <span>{{carData.zi}}</span>
                        <img :src="require('@/assets/insurance/down.png')" alt="">
                    </label>
                    <p class="t600" style="color: #333;flex: 1">
                        <input name="num" type="text" placeholder="请输入车牌号码" v-model="carData.num" @change="getByteLen" @input="input" ref="input">
                    </p>
                    </div>
                </div>
                <div class="bottom">
                    <div class="xinghao">
                        <b class="t600">发动机号:</b>
                        <p class="t600" style="color: #333"><input type="text" v-model="carData.engineNumber"></p>
                    </div>
                    <div class="xinghao">
                        <b class="t600">车架号:</b>
                        <p class="t600" style="color: #333"><input type="text" v-model="carData.frameNumber"></p>
                    </div>
                </div>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: `${400 / 75}rem` }">
            <van-picker v-if="showpic == 1" :default-index="15" :columns="columns" @change="onChange" class="xuanze"/>
            <van-picker v-if="showpic == 2" :default-index="1" :columns="typecolumns" @change="onChange" class="xuanze"/>
        </van-popup>
        <btn @click="subAdd" :style="btnStyle" name="查询"></btn>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
import upImg from '@/components/input/upImg'
export default {
    name: 'indexwzcx',
    components:{
        btn,
        upImg
    },
    data () {
        return {
            checked: false,
            isUpper: false,
            showpic: 0,
            carData: {
                zi: '豫',
                num: '',
                engineNumber: '',
                frameNumber: '',
                lstype: ''
            },
            show: false,
            btnStyle: {
                bottom: `${40 / 75}rem`,
                position: 'fixed',
                left: 0,
                right: 0,
                margin: 'auto'
            },
            columns: ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新'],
            showtype: '小型汽车',
            typecolumns: [
                {text: '大型汽车', value: '01'},
                {text: '小型汽车', value: '02'},
            ]
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
        // 更改
        onChange(picker, value, index) {
            if(this.showpic == 1){
                this.carData.zi = value
            }else if(this.showpic == 2){
                console.log(value, index)
                this.carData.lstype = value.value
                this.showtype = value.text
            }
        },
        // 查询
        subAdd(){
            let subData = {
                "carorg": "", // 管局名称 不填默认为车牌所在地
                "engineno": "", // 发动机号 根据管局需要输入
                "frameno": "", // 车架号 根据管局需要输入
                "iscity": "0", // 是否返回城市 1返回 默认0不返回
                "lsprefix": "", // 车牌前缀
                "lsnum": "", // 车牌剩余部分
                "lstype": "02", // 车辆类型 默认小车02
                "memberPhone": "" // 用户手机号 浙江直连需要手机号
            }
            if(this.carData.lstype)
            subData.lstype = this.carData.lstype;
            subData.engineno = this.carData.engineNumber
            subData.frameno = this.carData.frameNumber
            subData.lsprefix = this.carData.zi
            subData.lsnum = this.carData.num
            this.$api.apisearch.queryIllegal(subData).then(res=>{
                console.log(res)
                this.$store.commit('changeWzcxData',res.data)
                this.$router.push('/wzcxres')
            })
            console.log(subData)
        },
        // 车辆类型
        carType(){
            this.showpic = 2;
            this.show = true
        },
        // 上传图片
        drivingPermit(res){
            console.log(res)
            if(res.data.code == 200){
                this.isUpper = true
                if(res.data.data.carNumber != ''){
                    let zi = res.data.data.carNumber.slice(0, 1),
                        num = res.data.data.carNumber.slice(1);
                    this.$set(this.carData, 'zi', zi)
                    this.$set(this.carData, 'num', num)
                }
                if(res.data.data.engineNumber){
                    this.$set(this.carData, 'engineNumber', res.data.data.engineNumber)
                }
                if(res.data.data.frameNumber){
                    this.$set(this.carData, 'frameNumber', res.data.data.frameNumber)
                }
            }
        },
        // 删除图片
        beforeDelete(){
            this.isUpper = false
        }
    },
    mounted(){
        this.$store.commit('changeTitle','违章查询')
        console.log(this.userData)
    },
    computed:{
        userData(){
            let data = this.$store.getters.userData
            return Object.assign({}, data)
        },
        brandId(){
            return this.$route.query.brandId
        },
        twoBrandId(){
            return this.$route.query.twoBrandId
        },
        vehicleId(){
            return this.$route.query.vehicleId
        },
        carId(){
            return this.$route.query.carId
        },
        carName(){
            return this.$route.query.carName
        },
    }
}
</script>

<style scoped lang="scss">
.indexwzcx{
    position: relative;
    padding-top: 2.973333rem;
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
        height: 4.173333rem;
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
    input{
        flex: 1;
        border: none;
        height: 100%;
        background: none;
        font-weight: bold;
        &::placeholder{
            font-weight: 500;
            color: #999;
            font-family:PingFang SC;
            font-size: .373333rem;
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