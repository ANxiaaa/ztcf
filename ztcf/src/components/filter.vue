<template>
    <div class="searchFilter">
        <ul ref="list">
            <li class="paixu" :class="{active: paixu.show}" @click.stop="changeShow(paixu)">
                <p>{{paixu.text}}<img :src="require('@/assets/xiasanjiao.png')" alt=""></p>
                <div @click.stop class="box" v-show="paixu.show">
                    <div class="an">
                        <input :class="{active: i.active}" type="button" v-for="(i, index) in paixu.items" @click.stop="changeBtn(paixu.items, index)" :key="i.val" :value="i.text">
                    </div>
                </div>
            </li>
        </ul>
        <div class="ashadow" :style="{ top }" v-show="paixu.show || jibie.show || jiage.show || shaixuan.show"></div>
    </div>
</template>

<script>
export default {
    name: 'searchFilter',
    data () {
        return {
            paixu:{
                text: '智能排序',
                name: 'zhineng',
                show: false,
                items: [{
                    text: '智能排序',
                    val: 0,
                    active: true
                },{
                    text: '优惠最高',
                    val: 1,
                    active: false
                },{
                    text: '优惠最低',
                    val: 2,
                    active: false
                },{
                    text: '价格最高',
                    val: 3,
                    active: false
                },{
                    text: '价格最低',
                    val: 4,
                    active: false
                }]
            },
            jibie:{
                text: '级别',
                name: 'jibie',
                items: [{
                    text: '不限',
                    val: 0,
                    active: true
                },{
                    text: '跑车',
                    val: 0,
                    active: false
                },{
                    text: '轿车',
                    val: 0,
                    active: false
                },{
                    text: '皮卡',
                    val: 0,
                    active: false
                },{
                    text: 'SUV',
                    val: 0,
                    active: false
                },]
            },
            jiage:{
                text: '价格',
                name: 'price',
                items: [{
                    text: '不限',
                    val: 0,
                    active: false
                },{
                    text: '10万以下',
                    val: 1,
                    active: false
                },{
                    text: '10万-20万',
                    val: 2,
                    active: false
                },{
                    text: '20万-30万',
                    val: 3,
                    active: false
                },{
                    text: '30万-50万',
                    val: 4,
                    active: false
                },{
                    text: '50万以上',
                    val: 5,
                    active: false
                },]
            },
            shaixuan:{
                text: '筛选',
                name: 'filter',
                items: [{
                    text: '变速箱',
                    name: 'gearbox',
                    list: [{
                        text: '手动挡',
                        name: 'shoudongdang',
                        val: 0,
                        active: false
                    },{
                        text: '自动挡',
                        name: 'zidongdang',
                        val: 1,
                        active: false
                    }]
                },{
                    text: '排放标准',
                    name: 'emission',
                    list: [{
                        text: '国六',
                        name: 'guo6',
                        val: 0,
                        active: false
                    },{
                        text: '国五',
                        name: 'guo5',
                        val: 1,
                        active: false
                    },{
                        text: '国四',
                        name: 'guo4',
                        val: 2,
                        active: false
                    }]
                },{
                    text: '排量',
                    name: 'displacement',
                    list: [{
                        text: '1.3L以下',
                        name: 'power0',
                        val: 0,
                        active: false
                    },{
                        text: '1.3L-1.6L',
                        name: 'power1',
                        val: 1,
                        active: false
                    },{
                        text: '1.7L-2.0L',
                        name: 'power2',
                        val: 2,
                        active: false
                    },{
                        text: '2.1L-3.0L',
                        name: 'power3',
                        val: 3,
                        active: false
                    },{
                        text: '3.0L-5.0L',
                        name: 'power4',
                        val: 4,
                        active: false
                    },{
                        text: '5.0L以上',
                        name: 'power5',
                        val: 5,
                        active: false
                    }]
                },{
                    text: '能源',
                    name: 'source',
                    list: [{
                        text: '机动车',
                        name: 'motorCar',
                        val: 0,
                        active: false
                    },{
                        text: '新能源',
                        name: 'newCar',
                        val: 1,
                        active: false
                    }]
                },{
                    text: '国别',
                    name: 'state',
                    list: [{
                        text: '德系',
                        name: 'germany',
                        val: 0,
                        active: false
                    },{
                        text: '日系',
                        name: 'japan',
                        val: 1,
                        active: false
                    },{
                        text: '美系',
                        name: 'america',
                        val: 2,
                        active: false
                    },{
                        text: '欧系',
                        name: 'europe',
                        val: 3,
                        active: false
                    },{
                        text: '韩系',
                        name: 'korea',
                        val: 4,
                        active: false
                    },{
                        text: '其他',
                        name: 'others',
                        val: 5,
                        active: false
                    }]
                }]
            },
            top: '',
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
        changeShow(a){
            this.$set(a,'show',!a.show)
        },
        changeBtn(a, index){
            console.log(a)
            for(let i = 0;i < a.length;i ++){
                this.$set(a[i],'active',false)
            }
            this.$set(a[index],'active',true)
        }
    },
    mounted(){
        console.log(this.$refs)
        let oheight = (this.$refs.list.offsetTop + this.$refs.list.offsetHeight) + 'px'
        this.top = oheight
    },
    computed:{
        // top(){
        //     console.log(this.$refs)
        //     let oheight = (this.$refs.list.offsetTop + this.$refs.list.offsetHeight) / 75 + 'rem'
        //     console.log(oheight)
        // }
    }
}
</script>

<style scoped lang="scss">
.searchFilter{
    height: .986667rem;
    border-bottom: .026667rem solid #F2F4F7;
    border-top: .026667rem solid #F2F4F7;
    ul{
        position: relative;
        display: flex;
        z-index: 1;
        li.active p{
            color: #2E6BE6
        }
        li{
            flex: 1;
            height: 100%;
            text-align: center;
            p{
                line-height: .986667rem;
                img{
                    height: .213333rem;
                    width: .213333rem;
                    margin-left: .066667rem;
                }
            }
            .box{
                position: absolute;
                top: 100%; left: 0; right: 0;
                background: #fff;
                padding-top: .533333rem;
                .an{
                    display: flex;
                    justify-content: start;
                    flex-wrap: wrap;
                    input{
                        height: .746667rem;
                        width: 2.8rem;
                        margin-left: .4rem;
                        margin-bottom: .4rem;
                        background: none;
                        border-radius: .373333rem;
                        border: .026667rem solid currentColor;
                        font-size: .32rem;
                        color: #999;
                    }
                    input.active{
                        color: #4771E6;
                    }
                }
            }
        }
    }
    .ashadow{
        background: rgba($color: #000000, $alpha: .6);
        position: absolute;
        bottom: 0;
        width: 100%;
    }
}
li.paixu{

}
</style>
