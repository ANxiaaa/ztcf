<template>
    <div class="carOne t600">
        <van-index-bar :index-list="indexList">
            <div v-for="(i, index) in all" :key="index">
                <van-index-anchor :index="i.index"/>
                <van-cell clickable v-for="a in i.list" :key="a.initial">
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
    },
    mounted(){
        this.all = this.indexList.map(i => {
            console.log(i)
            return {
                index: i,
                list: this.allCar.filter(a=>a.initial == i)
            }
        })
        console.log(this.all)
    },
    computed: {
        allCar(){
            let data = this.$store.getters.allCar
            return data
        },
        indexList(){
            let data = this.$store.getters.allIndexList
            return data
        },
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
>>> .van-cell__title{
    height: 1rem;
    display: flex;
}
>>> .van-cell{
    line-height: 1rem;
}
>>> .van-cell img{
    height: 1rem;
    margin-right: .6rem;
}
</style>