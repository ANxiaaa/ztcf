<template>
    <div class="vin t600">
        <img :src="require('@/assets/index/find/vinBG.png')" class="topBg" alt="">
        <div class="box container shadow">
            <h6>vin识别码</h6>
            <div>
                <div class="bottom">
                    <div class="xinghao">
                        <p class="t600" style="color: #333"><input type="text" placeholder="请输入17位vin车辆识别码" @input="input" v-model="vincode" ref="input"></p>
                    </div>
                </div>
                <h4>
                    <p>{{vincode.slice(0, 4)}}</p>
                    <p>{{vincode.slice(4, 8)}}</p>
                    <p>{{vincode.slice(8, 12)}}</p>
                    <p>{{vincode.slice(12, 16)}}</p>
                    <p>{{vincode.slice(16)}}</p>
                </h4>
            </div>
            <btn @click="subAdd" name="查询"></btn>
        </div>
        <div v-show="showRes" class="showres">
            <h6 class="container">查询结果</h6>
            <p class="container" v-for="(i,index) in resData" :key="index" v-if="Boolean(index.search(/^id|logo|carid|carlist|querymemberid|querytime|ip$/))">
                <b>{{parameter[index]}}</b>
                <span>{{i || '-'}}</span>
            </p>
            <div class="line"></div>
        </div>
        <div class="container">
            <img class="vinTip" :src="require('@/assets/index/find/vinTip.png')" alt="">
            <div class="showTip">
                <p>VIN码是英文(Vehicle Identification Number)的缩写，译为车辆识别代码,又称车辆识别码,车辆识别代码,车辆识别号,车辆识别代号,VIN码是表明车辆身份的代码。</p>
                <p>VIN码由17位字符(包括英文字母和数字)组成，俗称十七位码。是制造厂为了识别而给一辆车指定的一组字码。该号码的生成有着特定的规律，对应于每一辆车，并能保证五十年内在全世界范围内不重复出现。因此又有人将其称为"汽车身份证"。车辆识别代号中含有车辆的制造厂家、生产年代、车型、车身型式、发动机以及其它装备的信息。</p>
            </div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
import upImg from '@/components/input/upImg'
export default {
    name: 'vin',
    components:{
        btn,
        upImg
    },
    data () {
        return {
            vincode: '',
            showRes: false,
            resData: {},
            parameter: {
                manufacturer: '厂家名称',
                brand: '品牌',
                cartype: '车型',
                name: '名称',
                yeartype: '年款',
                environmentalstandards: '排放标准',
                comfuelconsumption: '油耗',
                engine: '发动机',
                gearbox: '变速箱',
                drivemode: '驱动方式',
                carbody: '车身形式',
                fronttiresize: '前轮胎尺寸',
                reartiresize: '后轮胎尺寸',
                vin: '车架号',
                fueltype: '燃油类型',
                displacement: '排量 L',
                fuelgrade: '燃油标号',
                price: '新车购置价格',
                frontbraketype: '前制动类型',
                rearbraketype: '后制动类型',
                parkingbraketype: '驻车制动类型',
                maxpower: '最大功率 KW',
                sizetype: '尺寸类型',
                gearnum: '档位数',
                geartype: '变速箱类型',
                seatnum: '座位数',
                bodystructure: '车体结构',
                maxhorsepower: '最大马力(Ps)',
                carlist: '车型列表',
                carid: '车ID',
                logo: 'LOGO',
                id: 'id'
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
        // 限制长度
        getByteLen(val) {
            let len = 0;
            let res = '';
            for (let i = 0; i < val.length; i++) {
                let a = val.charAt(i);
                if (!/.*[\u4e00-\u9fa5]+.*$/.test(a) && !/\s+/.test(a)) {
                    if(len >= 17){
                        this.Toast('请输入正确17位vin识别码')
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
            this.vincode = res
        },
        // 下单
        subAdd(){
            console.log(this.vincode)
            if(this.vincode == ''){
                this.Toast.fail('请输入您的vin识别码')
                return
            }
            if(this.vincode.length < 17){
                this.Toast.fail('请输入正确17位vin识别码')
                return
            }
            localStorage.vincode = this.vincode
            this.$api.apisearch.queryVin(this.vincode).then(res => {
                console.log(res)
                if(res.data != null){
                    this.showRes = true
                    this.resData = res.data
                }
            })
        },
    },
    mounted(){
        this.vincode = localStorage.vincode || ''
        this.$store.commit('changeTitle','违章查询')
    },
    computed:{
        userData(){
            return this.$store.getters.userData
        },
    }
}
</script>

<style scoped lang="scss">
.vin{
    position: relative;
    padding-top: 2.973333rem;
    .topBg{
        width: 100%;
        height: 4.16rem;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .box{
        h6{
            font-size: .32rem;
            color: #999;
        }
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
.jine{
    display: flex;
    flex: wrap;
    justify-content: space-between;
    text-align: center;
    margin-top: .4rem;
    .price{
        width:2.533333rem;
        height:1.6rem;
        border:.026667rem solid;
        border-color: rgba(179,179,179,1);
        border-radius:.133333rem;
        position: relative;
        &.active{
            background:rgba(230,144,46,0.1);
            border-color: rgba(230,144,46,1);
        }
        .showPrice{
            font-size: .48rem;
            margin-top: .1rem;
        }
        color: #B35F00;
        span{
            font-size: .32rem;
        }
        .tuijian{
            width: .84rem;
            height: .426667rem;
            position: absolute;
            top: -.16rem;
            right: 0;
        }
    }
}
h4{
    font-size: .45rem;
    line-height: 1rem;
    margin-top: .5rem;
    display: flex;
    justify-content: space-around;
    p{
        width: 16%;
    }
}
h6{
    font-size: .426667rem;
    color: #333;
}
.showres{
    margin-top: .733333rem;
    p{
        display: flex;
        justify-content: space-between;
        font-size: .373333rem;
        color: #333;
        padding: .353333rem 0;
        border-bottom: .026667rem solid #F2F4F7;
        &:last-child{
            border: none;
        }
        b{
            width: 2.773333rem;
            color: #999;
        }
        span{
            flex: 1;
        }
    }
}
.vinTip{
    display: block;
    width: 3.493333rem;
    height: .88rem;
    margin-top: .666667rem;
}
.showTip{
    position: relative;
    font-size: .373333rem;
    padding: .4rem;
    border:.026667rem solid rgba(51,51,51,1);
    p{
        text-indent: 2em;
        line-height: .6rem;
    }
}
</style>