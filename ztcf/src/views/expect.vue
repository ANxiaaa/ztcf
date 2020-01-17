<template>
    <div class="expect">
        <div class="box">
            <img :src="require('@/assets/expect.png')" alt="">
            <p>敬请期待</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'expect',
    components:{
    },
    data () {
        return {
        }
    },
    methods:{
    },
    mounted(){
        console.log(this.$route.path == '/expect')
        this.$store.commit('changeTitle','敬请期待')
    }
}
</script>

<style scoped lang="scss">
.box{
    position: absolute;
    width: 10rem;
    left: 0;right: 0;
    margin: auto;
    top: 20%;
    margin: auto;
    img{
        width: 100%;
    }
    p{
        font-size: .9rem;
        text-align: center;
        margin-top: -.9rem;
        color: #999;
    }
}
</style>