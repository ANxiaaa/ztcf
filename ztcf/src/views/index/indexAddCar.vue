<template>
    <div class="indexAddCar t600">
        <div class="card">
            <div class="defultCar">
                <b>默认车辆</b>
                <van-switch :size="`${50 / 75}rem`" v-model="checked"/>
            </div>
        </div>
        <div class="carInfo">
            <p>车辆信息</p>
            <div class="card">

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
        padding: .3rem .5rem;
        border-radius: .266667rem;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.2);
        margin: .5rem 0;
    }
    .defultCar{
        display: flex;
        justify-content: space-between;
        b{
            font-size: .4rem;
            color: #b3b3b3;
            line-height: .75rem;
        }
    }
}
</style>