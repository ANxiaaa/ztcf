<template>
    <div class="carTwo t600">
        <div v-for="(i, index) in allCarTwo" :key="index">
            <p>{{i.name}}</p>
            <van-cell @click="toCarThree(a)" v-for="a in i.list" :key="a.id" clickable is-link>
                <template slot="title">
                    <span class="custom-title">{{a.fullname}}</span>
                    <van-tag style="float: right" v-if="a.salestate == '停销'" type="danger">停销</van-tag>
                </template>
            </van-cell>
        </div>
    </div>
</template>

<script>
export default {
    name: 'carTwo',
    props: {
        
    },
    data () {
        return {
            all: []
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
        // 跳转三级车型
        toCarThree(data){
            this.$emit('toCarThree', data)
        }
    },
    mounted(){
        console.log(this.allCarTwo)
    },
    computed: {
        // 所有车辆
        allCarTwo(){
            let data = this.$store.getters.allCarTwo
            return data
        },
    }
}
</script>

<style scoped lang="scss">
p{
    background: #F2F4F7;
    color: #666;
    font-size: .32rem;
    line-height: .746667rem;
    padding-left: .266667rem;
}
</style>