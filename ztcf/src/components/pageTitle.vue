<template>
    <p class="container">
        <span class="t t600"><img :src="data.icon" alt="">{{data.name}}</span>
        <span class="m t600" @click="goMore">查看更多 <span>></span></span>
    </p>
</template>

<script>
export default {
    name: 'pageTitle',
    props: {
        data:{
            type: Object,
            default: {}
        }
    },
    data () {
        return {

        }
    },
    methods: {
        goMore (){
            console.log(1)
        }
    }
}
</script>

<style scoped lang="scss">
p{
    display: flex;
    justify-content: space-between;
    line-height: 1.333333rem;
    .t{
        position: relative;
        text-indent: .533333rem;
        font-size:.426667rem;
        img{
        position: absolute;
        display: block;
        left: 0;top: 0;bottom: 0;
        margin: auto;
        width: .4rem;
        height: .4rem;
        }
    }
    .m{
        font-size: .32rem;
        font-weight: 500;
        color: #999999;
        span{
            font-family: '宋体';
            font-weight: bold;
        }
    }
}
</style>
