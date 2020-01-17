<template>
    <ul>
        <li class="container" @click.stop="click(list)" v-for="(list, index) in data" :key="index">
            <img :src="list.url ? list.url : list.logo" alt="">
            <div>
                <h5 class="t600">{{list.title ? list.title : list.name}}</h5>
                <p class="label">
                    <span class="t600" v-for="i in list.label" :key="i">{{i}}</span>
                </p>
                <p class="price">
                    <b>官方指导价: ¥{{list.price}}</b>
                </p>
                <p class="sale t600">
                    <strong >特价: ¥{{list.sale}}</strong>
                    <span>降率: {{list.rate}}%</span>
                </p>
            </div>
            <i></i>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'leftpic',
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
        click(data){
            this.$emit('click', data)
        }
    }
}
</script>

<style scoped lang="scss">
ul{
    position: relative;
}
.container{
    padding-bottom: .453333rem;
    display: flex;
    justify-content: space-around;
    position: relative;
    div{
        overflow: hidden;
    }
    img{
        width: 3.733333rem;
        height: 100%;
        margin-right: .2rem;
        margin-bottom: .453333rem;
    }
    h5{
        font-size:.426667rem;
        color: #333;
        line-height: 1;
        white-space: pre;
        width: 100%;
        // overflow-x: auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .label{
        height: .426667rem;
        display: flex;
        margin-top: .213333rem;
        margin-bottom: .586667rem;
        white-space: pre;
        width: 100%;
        // overflow-x: auto;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    span{
        display: block;
        border-radius: .213333rem;
        background: #F3F3F3;
        color: #999999;
        margin-right: .16rem;
        padding: 0 .16rem;
        font-size: .293333rem;
        font-weight: 500;
    }
    .price{
        color: #999999;
        font-size:.32rem;
        line-height: 1;
        margin-bottom: .186667rem;
        font-weight: 500
    }
    .sale{
        display: flex;
        strong{
            font-weight: 500;
            color: #D95A41;
            font-size: .4rem;
        }
        span{
            margin-left: .16rem;
            background: rgba($color: #175CE6, $alpha: .1);
            color: #175CE6;
            height: .5rem;
            line-height: .6rem;
        }
    }
    i{
        position: absolute;
        bottom: .453333rem;left: 0;right: 0;
        height: .026667rem;
        border-radius: .013333rem;
        background: #F2F4F7;
    }
}
</style>
