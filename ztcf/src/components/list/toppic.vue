<template>
    <ul class="container">
        <li v-for="(i,index) in data" :key="index">
            <img :src="i.url" alt="">
            <p>
                <span>¥{{i.price}}</span>
                <del>¥{{i.oldprice}}</del>
            </p>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'toppic',
    props: {
        data:{
            type: Array,
            default: []
        }
    },
    data () {
        return {

        }
    },
    methods: {

    }
}
</script>

<style scoped lang="scss">
.container{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    li{
        width: 2.133333rem;
        height: 3.2rem;
        img{
            width: 2.133333rem;
            height: 2.133333rem;
            display: block;
        }
        p{
            line-height: .746667rem;
            font-size:.4rem;
            font-family:DIN;
            font-weight:bold;
            height: .666667rem;
            text-align: center;
            span{
                font-size:.38rem;
                color: #D95A41;
            }
            del{
                color: #999999;
                font-size:.28rem;
                line-height: .83rem
            }
        }
    }
}
</style>
