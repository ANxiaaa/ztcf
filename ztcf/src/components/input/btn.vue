<template>
    <button @touchstart="down" @touchend="up" :disabled="disabled" @click="click" class="w600">{{name}}</button>
</template>

<script>
export default {
    name: 'btn',
    props: {
        name: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        },
        startColor: {
            type: String,
            default: '#1f42a1'
        },
        endColor: {
            type: String,
            default: '#4771E6'
        },
    },
    data () {
        return {

        }
    },
    methods: {
        down(a){
            if(!this.disabled){
                a.target.style.background = this.startColor
            }
        },
        up(a){
            if(!this.disabled){
                a.target.style.background = this.endColor
            }
        },
        click(){
            this.$emit('click')
        }
    }
}
</script>

<style scoped lang="scss">
button{
    width: 8rem;
    height: 1.173333rem;
    line-height: 1.173333rem;
    background:#4771E6;
    border-radius:.586667rem;
    font-size:.426667rem;
    font-weight:500;
    color: #FFFFFF;
    border: none;
    margin: auto;
    display: block;
}
</style>
