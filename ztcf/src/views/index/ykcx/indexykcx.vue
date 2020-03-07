<template>
    <div class="indexykcx t600">
        <!-- <img :src="require('@/assets/index/find/wzcxBG.png')" class="topBg" alt=""> -->
        <div class="box container shadow">
            <h6>填写信息：</h6>
            <div>
                <div class="bottom">
                    <div class="xinghao">
                        <b class="t600">卡号:</b>
                        <p class="t600" style="color: #333"><input type="text" placeholder="请输入卡号" @input="input" v-model="subData.fuelcard" ref="input"></p>
                    </div>
                </div>
                <h4>
                    <p>{{subData.fuelcard.slice(0, 4)}}</p>
                    <p>{{subData.fuelcard.slice(4, 8)}}</p>
                    <p>{{subData.fuelcard.slice(8, 12)}}</p>
                    <p>{{subData.fuelcard.slice(12, 16)}}</p>
                    <p>{{subData.fuelcard.slice(16)}}</p>
                </h4>
            </div>
            <h6 style="margin-top: .55rem">充值金额：</h6>
            <div class="jine">
                <div v-for="(i, index) in priceList" @click="changePirce(index)" :key="index" class="price" :class="{active: i.active}">
                    <p class="showPrice">{{i.amount}}元</p>
                    <span>售价:{{i.amount}}元</span>
                    <img v-show="i.tuijian" class="tuijian" :src="require('@/assets/tuijian.png')" alt="">
                </div>
            </div>
        </div>
        <btn @click="subAdd" :style="btnStyle" name="立即下单"></btn>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
import upImg from '@/components/input/upImg'
export default {
    name: 'indexykcx',
    components:{
        btn,
        upImg
    },
    data () {
        return {
            // 下单类型
            orderProductType: 'refueling_card',
            subData: {
                fuelcard: '',
                amount: 100
            },
            btnStyle: {
                bottom: `${40 / 75}rem`,
                position: 'fixed',
                left: 0,
                right: 0,
                margin: 'auto'
            },
            priceList: [{
                amount: 100,
                active: true
            },{
                amount: 200,
                active: false
            },{
                amount: 500,
                active: false,
                tuijian: true
            },]
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
        changePirce(idx){
            this.priceList.forEach((i, index) => {
                i.active = false
                if(index == idx){
                    i.active = true
                    this.subData.amount = i.amount
                }
            })
        },
        // 限制长度
        getByteLen(val) {
            let len = 0;
            let res = '';
            for (let i = 0; i < val.length; i++) {
                let a = val.charAt(i);
                if (!/.*[\u4e00-\u9fa5]+.*$/.test(a) && !/\s+/.test(a)) {
                    if(len >= 19){
                        this.Toast('请输入正确19位卡号')
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
            this.$set(this.subData, 'fuelcard', res)
        },
        // 下单
        subAdd(){
            console.log(this.subData)
            if(this.subData.fuelcard == ''){
                this.Toast.fail('请输入您的卡号')
                return
            }
            if(this.subData.fuelcard.length < 19){
                this.Toast.fail('请输入正确19位卡号')
                return
            }
            localStorage.youka = this.subData.fuelcard
            this.$api.order.postassemblyOrder(this.orderProductType, this.subData).then(res=>{
                console.log(res)
                if(res.code == 200){
                    this.$store.commit('changeJiayouOrder', res.data)
                    this.$router.push('/addJykOrder')
                }else{
                    this.Toast.fail(res.msg)
                }
            })
        },
    },
    mounted(){
        this.subData.fuelcard = localStorage.youka || ''
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
.indexykcx{
    position: relative;
    padding-top: 2.973333rem;
    .topBg{
        width: 100%;
        height: 4.173333rem;
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
    font-size: .666667rem;
    line-height: 1rem;
    margin-top: .5rem;
    display: flex;
    justify-content: space-around;
    p{
        width: 16%;
    }
}
</style>