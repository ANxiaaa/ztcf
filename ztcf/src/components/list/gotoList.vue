<template>
<div class="touch" @touchstart="down" @touchend="up" @click="click">
    <div class="t600">
        <b>{{name}}:</b>
        <p v-if="!input">{{value}}</p>
        <input type="text" :placeholder="placeholder" v-else v-model="myValue" @input="sendData"/>
        <span v-show="bindtap || jiantou">></span>
    </div>
    <div class="bd"></div>
</div>
</template>

<script>
export default {
    name: 'gotoList',
    props: {
        name: {
            type: String,
            default: ''
        },
        value: {
            type: String || Number,
            default: null
        },
        bindtap: {
            type: Boolean,
            default: false
        },
        input: {
            type: Boolean,
            default: false
        },
        placeholder: {
            type: String,
            default: ''
        },
        jiantou: {
            type: Boolean,
            default: false
        }
    },
    data(){
        let _this = this
        return {
            myValue: _this.value
        }
    },
    watch: {
        value(newValue){
            this.myValue = newValue
        },
        myValue(newValue){
            this.$emit('input', newValue)
        }
    },
    methods: {
        sendData(e){
            this.$emit('input', this.myValue)
        },
        down(a){
            if(!this.bindtap)return;
            a.path.forEach(i=>{
                if(i.className === 'touch'){
                    i.style.background = '#ececec'
                }
            })
        },
        up(a){
            if(!this.bindtap)return;
            a.path.forEach(i=>{
                if(i.className === 'touch'){
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
.t600{
    height: 1.44rem;
    line-height: 1.44rem;
    display: flex;
    justify-content: space-between;
    padding: 0 .426667rem;
    font-weight: 500;
    b{
        font-size: .4rem;
        color: #999;
        width: 1.866667rem;
    }
    p{
        font-size: .373333rem;
        color: #333;
        flex: 1;
    }
    span{
        font-weight: bold;
        font-family: '宋体';
        color: #b3b3b3;
    }
    input{
        border: none;
        background: none;
        font-size:.373333rem;
        flex: 1;
        &::placeholder{
            font-size:.373333rem;
            font-family:PingFang SC;
            font-weight:500;
            color: #B3B3B3;
        }
    }
}
</style>
