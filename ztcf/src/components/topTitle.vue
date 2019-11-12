<template>
    <div>
        <span v-if="back" @click="toBack"><</span>
        <p class="t600">{{title}}</p>
    </div>
</template>

<script>
export default {
    name: 'topTitle',
    data () {
        return {

        }
    },
    methods: {
        toBack (){
            this.$router.go(-1)
        }
    },
    computed: {
        title(){
            return this.$store.getters.appTitle
        },
        back(){
            return this.$route.meta.back
        }
    }
}
</script>

<style scoped lang="scss">
div{
    height: 1.173333rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    span{
        position: absolute;
        height: 100%;
        width: .8rem;
        font-size: .6rem;
        font-family: '宋体';
        font-weight: bold;
        line-height: 1.173333rem;
        text-align: center;
    }
    .t600{
        font-size: .48rem;
        line-height: 1.173333rem;
        text-align: center;
        // font-weight: normal;
        border-bottom: .013333rem solid #ececec;
    }
}
</style>
