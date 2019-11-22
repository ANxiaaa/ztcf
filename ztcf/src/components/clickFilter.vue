<template>
    <div class="searchFilter">
        <ul ref="list">
            <li class="paixu" :class="{active: paixu.show || paixu.active}" @click.stop="changeShow(paixu)">
                <p>{{paixu.text}}<img :src="require('@/assets/xiasanjiao.png')" alt=""></p>
                <div @click.stop class="box" v-show="paixu.show">
                    <div class="an">
                        <input :class="{active: i.active}" type="button" v-for="(i, index) in paixu.items" @click.stop="changeBtn(paixu, paixu.items, index)" :key="i.text" :value="i.text">
                    </div>
                </div>
            </li>
            <li class="jibie" :class="{active: jibie.show || jibie.active}" @click.stop="changeShow(jibie)">
                <p>{{jibie.text}}<img :src="require('@/assets/xiasanjiao.png')" alt=""></p>
                <div @click.stop class="box" v-show="jibie.show">
                    <div class="an">
                        <div class="jibielist" v-for="(i, index) in jibie.items" :class="{active: i.active}" @click.stop="changeBtn(jibie, jibie.items, index)" :key="i.text">
                            <img :src="i.active?i.pic1:i.pic" alt="">
                            {{i.text}}
                        </div>
                    </div>
                </div>
            </li>
            <li class="jiage" :class="{active: jiage.show || jiage.active}" @click.stop="changeShow(jiage)">
                <p>{{jiage.text}}<img :src="require('@/assets/xiasanjiao.png')" alt=""></p>
                <div @click.stop class="box" v-show="jiage.show">
                    <div class="an">
                        <input :class="{active: i.active}" type="button" v-for="(i, index) in jiage.items" @click.stop="changeBtn(jiage, jiage.items, index)" :key="i.text" :value="i.text">
                    </div>
                </div>
            </li>
            <li class="shaixuan" :class="{active: shaixuan.show || shaixuan.active}" @click.stop="changeShow(shaixuan)">
                <p>{{shaixuan.text}}<img :src="require('@/assets/xiasanjiao.png')" alt=""></p>
                <div @click.stop class="box" v-show="shaixuan.show">
                    <div v-for="i in shaixuan.items" :key="i.text">
                        <span class="t600">{{i.text}}</span>
                        <div class="an">
                            <input :class="{active: a.active}" type="button" v-for="(a, index) in i.list" @click.stop="changeBtn(shaixuan, i.list, index)" :key="a.text" :value="a.text">
                        </div>
                    </div>
                    <div class="sxbtn container t600">
                        <button @touchstart="deldown" @click="del" @touchend="delup" class="del">删除</button>
                        <button @click="save" @touchstart="savedown" @touchend="saveup" class="save">保存</button>
                    </div>
                </div>
            </li>
        </ul>
        <div @click="close" class="ashadow" :style="{ top }" v-show="paixu.show || jibie.show || jiage.show || shaixuan.show"></div>
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
                    active: true,
                    pic: require('@/assets/sale/filter/bx.png'),
                    pic1: require('@/assets/sale/filter/bx1.png')
                },{
                    text: '跑车',
                    val: 0,
                    active: false,
                    pic: require('@/assets/sale/filter/pc.png'),
                    pic1: require('@/assets/sale/filter/pc1.png')
                },{
                    text: '轿车',
                    val: 0,
                    active: false,
                    pic: require('@/assets/sale/filter/jc.png'),
                    pic1: require('@/assets/sale/filter/jc1.png')
                },{
                    text: '皮卡',
                    val: 0,
                    active: false,
                    pic: require('@/assets/sale/filter/pk.png'),
                    pic1: require('@/assets/sale/filter/pk1.png')
                },{
                    text: 'SUV',
                    val: 0,
                    active: false,
                    pic: require('@/assets/sale/filter/suv.png'),
                    pic1: require('@/assets/sale/filter/suv1.png')
                },]
            },
            jiage:{
                text: '价格',
                name: 'price',
                items: [{
                    text: '不限',
                    val: 0,
                    active: true
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
            top: ''
        }
    },
    computed: {
        oh(){
            return this.paixu.show || this.jibie.show || this.jiage.show || this.shaixuan.show
        }
    },
    watch:{
        oh(a){
            console.log(a)
            this.$emit('getOh', a)
        }
    },
    methods: {
        deldown(a){
            console.log(a)
            a.target.style.color = '#c00'
        },
        delup(a){
            a.target.style.color = '#b3b3b3'
        },
        savedown(a){
            a.target.style.backgroundColor = '#1f42a1'
        },
        saveup(a){
            a.target.style.background = '#4771E6'
        },
        changeShow(a){
            let oheight = (this.$refs.list.offsetTop + this.$refs.list.offsetHeight) + 'px'
            this.top = oheight
            if(!a.show){
                this.$set(this.paixu,'show',false)
                this.$set(this.jibie,'show',false)
                this.$set(this.jiage,'show',false)
                this.$set(this.shaixuan,'show',false)
            }
            this.$set(a,'show', !a.show)
        },
        changeBtn(box, a, index){
            // let show = this.paixu.show || this.jibie.show || this.jiage.show || this.shaixuan.show
            // console.log(show)
            if(this.shaixuan.show){
                a.forEach(i=>{
                    this.$set(i,'active',false)
                })
            }else {
                if(this.paixu.active)this.$set(this.paixu,'active',false)
                if(this.jibie.active)this.$set(this.jibie,'active',false)
                if(this.jiage.active)this.$set(this.jiage,'active',false)
                if(this.shaixuan.active)this.$set(this.shaixuan,'active',false)
                this.clearbtn(this.paixu)
                this.clearbtn(this.jibie)
                this.clearbtn(this.jiage)
            }
            this.$set(a[index],'active',!a[index].active)
        },
        clearbtn(a){
            a.items.forEach(i=>{
                this.$set(i, 'active', false)
            })
        },
        del(){
            for(let i = 0;i < this.shaixuan.items.length; i ++){
                let list = this.shaixuan.items[i].list
                for(let j = 0;j < list.length;j ++){
                    this.$set(list[j], 'active', false)
                }
            }
        },
        save(){
            let data = {};
            for(let i = 0;i < this.shaixuan.items.length; i ++){
                let list = this.shaixuan.items[i].list
                let items = this.shaixuan.items[i].name
                for(let j = 0;j < list.length;j ++){
                    if(list[j].active){
                        data[items] = list[j].val
                    }
                }
            }
            console.log(data)
        },
        close(){
            console.log(this.paixu.items.some(i=>i.active))
            if(!this.shaixuan.show){
                if(this.paixu.items.some(i=>i.active))this.$set(this.paixu, 'active', true)
                if(this.jibie.items.some(i=>i.active))this.$set(this.jibie, 'active', true)
                if(this.jiage.items.some(i=>i.active))this.$set(this.jiage, 'active', true)
            }else {
                this.del()
            }
            this.$set(this.paixu, 'show', false)
            this.$set(this.jibie, 'show', false)
            this.$set(this.jiage, 'show', false)
            this.$set(this.shaixuan, 'show', false)
        }
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
        z-index: 11;
        li.active p{
            color: #2E6BE6;
        }
        li{
            flex: 1;
            height: 100%;
            text-align: center;
            p{
                font-size: .32rem;
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
                        font-size: .32rem;
                        color: #999;
                        background: none;
                        border-radius: .373333rem;
                        border: .026667rem solid currentColor;
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
        z-index: 10;
    }
}
li.shaixuan{
    span{
        text-align: left;
        display: block;
        margin-bottom: .4rem;
        margin-left: .4rem;
        font-size:.373333rem;
        line-height: 1;
        color: #333;
    }
    .sxbtn{
        margin-top: .3rem;
        display: flex;
        justify-content: space-between;
        margin-bottom: .266667rem;
        button{
            width: 4.266667rem;
            height: 1.173333rem;
            border-radius: .586667rem;
            background: none;
            border: .026667rem solid currentColor;
            font-size: .426667rem;
            font-weight: 500;
            color: #b3b3b3;
        }
        .save{
            background: #4771E6;
            border-color: #4771E6;
            color: #fff;
        }
    }
}
.jibielist{
    width: 2.8rem;
    margin-left: .4rem;
    margin-bottom: .4rem;
    font-size: .32rem;
    color: #999;
    img{
        width: 1.333333rem;
        height: .8rem;
        display: block;
        margin: auto;
    }
}
.jibielist.active{
    color: #4771E6;
}
</style>
