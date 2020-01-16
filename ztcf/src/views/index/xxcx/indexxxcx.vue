<template>
    <div class="indexxxcx t600">
        <img class="topBG" :src="require('@/assets/index/find/xxcxBG.png')" alt="">
        <div class="cxBox">
            <div class="chepai">
                <b>车牌号:</b>
                <div>
                <label class="l1" @click="show = true;showpic = 1">
                    <span>{{cxData.zi}}</span>
                    <img :src="require('@/assets/insurance/down.png')" alt="">
                </label>
                <p class="t600" style="color: #333;flex: 1">
                    <input name="num" type="text" placeholder="请输入车牌号码" v-model="cxData.num" @change="getByteLen" @input="input" ref="input">
                </p>
                </div>
            </div>
            <div class="xinghao">
                <b class="t600">选择城市:</b>
                <p class="t600" style="color:#333" @click="changeCity">
                    <strong>{{cxData.queryCity}}</strong>
                <span>></span></p>
            </div>
            <div class="xinghao">
                <b class="t600">选择日期:</b>
                <p class="t600" style="color:#333" @click="changeDate">
                    <strong>{{timeFormat(cxData.queryDate)}}</strong>
                <span>></span></p>
            </div>
            <btn @click="subData" name="查询"></btn>
        </div>
        <div class="showres" v-if="showres">
            <div class="wrap">
                <h6>查询结果</h6>
                <p>限行号码</p>
                <div>{{resData.number}}</div>
                <p>限行摘要</p>
                <div>{{resData.summary}}</div>
                <p>限行区域</p>
                <div>{{resData.area}}</div>
            </div>
        </div>
        <van-popup v-model="show" round position="bottom" :style="{ height: `${400 / 75}rem` }">
            <van-picker v-if="showpic == 1" :default-index="15" :columns="columns" @change="onChange" class="xuanze"/>
            <van-picker v-if="showpic == 2" :default-index="1" value-key="cityname" :columns="cityColumns" @change="onChange" class="xuanze"/>
            <van-datetime-picker :show-toolbar="false" v-if="showpic == 3" v-model="cxData.queryDate" type="date" :min-date="minDate" :max-date="maxDate"/>
        </van-popup>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
    name: 'indexxxcx',
    components:{
        btn
    },
    data () {
        return {
            show: false,
            showpic: 0,
            showres: false,
            cxData: {
                zi: '豫',
                num: '',
                queryCity: '郑州',
                queryDate: new Date()
            },
            columns: ['京','津','冀','晋','蒙','辽','吉','黑','沪','苏','浙','皖','闽','赣','鲁','豫','鄂','湘','粤','桂','琼','渝','川','贵','云','藏','陕','甘','青','宁','新'],
            cityColumns: [],
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025, 11, 31),
            resData: {}
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
            this.$set(this.cxData, 'num', res)
        },
        // 更改城市
        changeCity(){
            this.show = true;
            this.showpic = 2;
        },
        // 更改时间
        changeDate(){
            this.show = true;
            this.showpic = 3;
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
        // 更改
        onChange(picker, value, index) {
            if(this.showpic == 1){
                this.cxData.zi = value
            }else if(this.showpic == 2){
                console.log(value)
                this.cxData.queryCity = value.cityname
            }
        },
        // 查询
        subData(){
            console.log(this.cxData)
            let carNum = this.cxData.zi + this.cxData.num,
                { queryCity, queryDate} = this.cxData;
            let data = {
                carNum,
                queryCity,
                queryDate
            }
            console.log(data)
            this.$api.apisearch.queryLimitRow(data).then(res=>{
                console.log(res)
                if(res.code == 200){
                    this.resData = res.data
                    this.showres = true
                }else{
                    this.showres = false
                }
            })
        }
    },
    mounted(){
        this.$store.commit('changeTitle','限行查询')
        this.$api.apisearch.getCityAll().then(res=>{
            console.log(res)
            let compare = (a, b)=>{
                return a.city.localeCompare(b.city)
            }
            this.cityColumns = res.data.sort(compare)
        })
    }
}
</script>

<style scoped lang="scss">
.indexxxcx{
    height: 100%;
    overflow-y: auto;
    position: relative;
    padding-top: 4.506667rem;
    .topBG{
        width: 100%;
        height: 5.333333rem;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .cxBox{
        width: 9.2rem;
        margin: auto;
        border-radius:.266667rem;
        background: #fff;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.19);
        padding: .06rem .4rem;
        input{
            flex: 1;
            background: none;
            border: none;
            height: 100%;
            font-weight: bold;
        }
    }
    b{
        font-size: .4rem;
        color: #999999;
    }
    .xinghao{
        height: .666667rem;
        display: flex;
        line-height: .666667rem;
        margin: .4rem 0;
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
    button{
        margin: 1rem auto .733333rem;
    }
    .showres{
        width: 10rem;
        margin: auto;
        .wrap{
            margin: .866667rem .8rem;
            color: #333;
            h6{
                font-size: .426667rem;
                font-weight: bold;
            }
            p{
                font-size: .32rem;
                border-bottom: .133333rem solid rgba(71,113,230,.2);
                display: inline-block;
                height: .42rem;
                margin: .333333rem 0;
            }
            div{
                color: #666
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
</style>