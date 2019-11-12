<template>
    <div class="t600 btmborder">
        <p>{{name}}</p>
        <div class="shuru">
            <input :type="type" :onpaste="type==='password'?'return false':''" :placeholder="placeholder" v-model="data">
            <div>
                <slot></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'btmborder',
    props: {
        name:{
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        },
        type:{
            type: String,
            default: 'text'
        }
    },
    data () {
        return {
            data: ''
        }
    },
    methods: {

    },
    watch: {
        data (){
            this.$emit('getData', this.send)
        }
    },
    computed: {
        send(){
            return this.data
        }
    }
}
</script>

<style scoped lang="scss">
.btmborder{
    p{
        font-size:.373333rem;
        color: #999999;
        margin-bottom: .373333rem;
    }
    .shuru{
        height: .8rem;
        display: flex;
        padding-bottom: .106667rem;
        border-bottom: .026667rem solid #F2F4F7;
        input{
            flex: 1;
            border: none;
            &::placeholder{
                font-size:.373333rem;
                color: #B3B3B3;
                font-family:PingFang SC;
                font-weight:500;
            }
        }
        div{
            width: 2.266667rem;
        }
    }
}
</style>
