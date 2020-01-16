<template>
    <div class="expect">

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
</style>