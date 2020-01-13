<template>
    <div class="indexAddCar t600">
        <div class="card">
            <div class="defultCar">
                <b>默认车辆</b>
                <van-switch :size="`${40 / 75}rem`" v-model="checked"/>
            </div>
        </div>
        <div class="carInfo">
            <strong>车辆信息</strong>
            <div class="card">
                <div v-if="true" class="sao">
                    <img :src="require('@/assets/index/addCar/saoyisao.png')" alt="">
                    <span>识别行驶证</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'indexAddCar',
    components:{
    },
    data () {
        return {
            checked: false
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
    },
    mounted(){
        this.$store.commit('changeTitle','车辆信息')
    },
    computed:{

    }
}
</script>

<style scoped lang="scss">
.indexAddCar{
    width: 9.2rem;
    margin: auto;
    .card{
        padding: .15rem .35rem;
        border-radius: .266667rem;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,.1);
        margin: .5rem 0;
    }
    strong{
        font-size: .373333rem;
        color: #333;
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
    .sao{
        display: flex;
        justify-content: center;
        align-items: center;
        color: #4771E6;
        font-size: .4rem;
        line-height: .8rem;
        img{
            display: block;
            width: .373333rem;
            height: .373333rem;
            margin-right: .2rem;
        }
    }
}
</style>