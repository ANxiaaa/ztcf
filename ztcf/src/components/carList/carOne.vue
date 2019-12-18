<template>
    <div class="carOne t600">
        <van-index-bar :index-list="indexList">
            <div v-for="(i, index) in all" :key="index">
                <van-index-anchor :index="i.index"/>
                <van-cell @click="toCarTwo(a)" clickable v-for="a in i.list" :key="a.initial">
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
    name: 'carOne',
    props: {
        
    },
    data () {
        return {
            all: []
        }
    },
    methods: {
        // 选择二级车辆
        toCarTwo(data){
            this.$emit('toCarTwo', data)
        }
    },
    mounted(){
        // 格式化数据
        this.all = this.indexList.map(i => {
            return {
                index: i,
                list: this.allCar.filter(a=>a.initial == i)
            }
        })
        console.log(this.all)
    },
    computed: {
        // 所有车辆
        allCar(){
            let data = this.$store.getters.allCar
            return data
        },
        // 所有车辆存在的首字母
        indexList(){
            let data = this.$store.getters.allIndexList
            return data
        },
    }
}
</script>

<style scoped>
>>> .van-cell__title{
    height: 1rem;
    display: flex;
}
>>> .van-cell{
    line-height: 1rem;
}
>>> .van-cell__title span{
    font-size: .266667rem
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