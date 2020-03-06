<template>
    <div @touchstart="down" @touchend="up" class="myTitle" @click="click">
        <p class="t600" :style="{fontSize: data.fs / 75 + 'rem',lineHeight: data.lh === 1 ? 1 : data.lh / 75 + 'rem',fontWeight: data.fw ? data.fw : 600,color: data.color}">{{data.name}}</p>
        <van-icon name="arrow" size=".3rem" color="#b3b3b3"/>
    </div>
</template>

<script>
export default {
    name: 'myTitle',
    props: {
        data:{
            type: Object,
            default: {
                name: '', // 名称
                fs: '', // 字体大小
                lh: 1, // 行高
                fw: 600, //加粗
                color: '' //字体颜色
            }
        }
    },
    data () {
        return {

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
        click(){
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="scss">
div{
    padding: .32rem;
    display: flex;
    justify-content: space-between;
    span{
        font-family: '宋体';
        font-weight: bold;
        color: #b3b3b3;
        font-size: .32rem;
    }
}
</style>
