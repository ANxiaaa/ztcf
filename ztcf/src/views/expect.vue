<template>
    <div class="notPage">
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