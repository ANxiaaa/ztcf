<template>
    <div class="carSelect t600">
        <van-index-bar :index-list="indexList" highlight-color="#2E6BE6">
            <div v-for="i in indexList" :key="i">
                <van-index-anchor :index="i"/>
                <van-cell clickable v-for="(a, idx) in allBrand" v-if="a.initial == i" :key="idx" @click="toTwo(a)">
                    <template slot="title">
                        <img :src="a.logo" alt="">
                        <span class="custom-title">{{a.name}}</span>
                    </template>
                </van-cell>
            </div>
        </van-index-bar>
    </div>
</template>

<script>
export default {
    name: 'myTitle',
    props: {
        indexList:{
            type: Array,
            default: []
        },
        allBrand: {
            type: Array,
            default: []
        }
    },
    methods: {
        // 点击反馈
        down(a){
            a.path.forEach(i=>{
                if(i.className === 'myTitle'){
                    i.style.background = '#ececec'
                }
            })
        },
        up(a){
            a.path.forEach(i=>{
                if(i.className === 'myTitle'){
                    i.style.background = 'none'
                }
            })
        },
        // 跳转二级
        toTwo(data){
            this.$emit('click', data.id)
        }
    },
    mounted(){
        console.log(this.indexList)
    }
}
</script>

<style scoped lang="scss">
.carSelect{
    width: 10rem;
    margin: auto;
    position: relative;
    font-weight: 500;
}
</style>
<style scoped>
>>> .van-index-bar__sidebar span{
    font-size:.346667rem;
    color: #999;
    font-family: Arial, Helvetica, sans-serif;
    line-height: .54rem;
}
>>> .van-cell__title{
    height: 1rem;
    display: flex;
}
>>> .van-cell{
    line-height: 1rem;
}
>>> .van-cell__title span{
    font-size: .373333rem
}
>>> .van-cell img{
    height: 1rem;
    margin-right: .6rem;
}
>>> .van-index-bar__index{
    font-size: .45rem;
    line-height: .6rem
}
</style>