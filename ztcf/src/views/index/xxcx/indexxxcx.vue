<template>
    <div class="indexxxcx t600">
        <img class="topBG" :src="require('@/assets/index/find/xxcxBG.png')" alt="">
        <div class="cxBox">
            <div class="xinghao">
                <b class="t600">车牌号:</b>
                <p class="t600" style="color:#333">
                    <strong></strong>
                <span>></span></p>
            </div>
            <div class="xinghao">
                <b class="t600">选择城市:</b>
                <p class="t600" style="color:#333">
                    <strong></strong>
                <span>></span></p>
            </div>
            <div class="xinghao">
                <b class="t600">选择日期:</b>
                <p class="t600" style="color:#333">
                    <strong></strong>
                <span>></span></p>
            </div>
            <btn name="查询"></btn>
        </div>
        <div class="showres">
            <div class="wrap">
                <h6>查询结果</h6>
                <p>限行号码</p>
                <div>啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
            </div>
        </div>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
    name: 'indexxxcx',
    components:{
        btn
    },
    data () {
        return {
        }
    },
    methods:{
        // 点击反馈
        down(a){
            a.target.style.background = '#073694'
        },
        up(a){
            a.target.style.background = '#2E6BE6'
        }
    },
    mounted(){
        this.$store.commit('changeTitle','限行查询')
    }
}
</script>

<style scoped lang="scss">
.indexxxcx{
    height: 100%;
    overflow-y: auto;
    position: relative;
    padding-top: 4.506667rem;
    .topBG{
        width: 100%;
        height: 5.333333rem;
        position: absolute;
        top: 0;
        z-index: -1;
    }
    .cxBox{
        width: 9.2rem;
        margin: auto;
        border-radius:.266667rem;
        background: #fff;
        box-shadow: 0 -0.01rem 0.2rem 0 rgba(46,107,230,0.19);
        padding: .06rem .4rem;
    }
    .xinghao{
        height: .666667rem;
        display: flex;
        line-height: .666667rem;
        color: #999999;
        margin: .4rem 0;
        b{
            font-size: .4rem;
        }
        p{
            font-size:.373333rem;
            font-weight: 500;
            position: relative;
            flex: 1;
            line-height: .62rem;
            margin-left: .1rem;
            border-bottom: .013333rem solid #F2F4F7;
            white-space: pre;
            display: flex;
            strong{
                margin-right: .5rem;
                width: 6rem;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            span{
                font-family: '宋体';
                font-weight: bold;
                color: #999;
                position: absolute;
                right: 0;
            }
        }
    }
    button{
        margin: 1rem auto .733333rem;
    }
    .showres{
        width: 10rem;
        margin: auto;
        .wrap{
            margin: .866667rem .8rem;
            color: #333;
            h6{
                font-size: .426667rem;
                font-weight: bold;
            }
            p{
                font-size: .32rem;
                border-bottom: .133333rem solid rgba(71,113,230,.2);
                display: inline-block;
                height: .42rem;
                margin: .333333rem 0;
            }
            div{
                color: #666
            }
        }
    }
}
</style>