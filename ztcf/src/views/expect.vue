<template>
    <div class="notPage">
        <div v-if="!yes" class="box">
            <img :src="require('@/assets/expect.png')" alt="">
            <p>敬请期待</p>
        </div>
        <div v-else class="box">
            <img :src="require('@/assets/expect.png')" alt="">
            <p>提交成功 <br/>请等待工作人员联系</p>
        </div>
        <div v-if="yes" class="fixBox">
            <btn @click="$router.push('/index')" name="返回首页"></btn>
        </div>
    </div>
</template>

<script>
import btn from '@/components/input/btn'
export default {
    name: 'expect',
    components:{
        btn
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
    },
    computed: {
        yes(){
            return this.$route.query.yes
        }
    }
}
</script>
<style scoped>
.fixBox{
    padding: .346667rem;
    position: fixed;
    bottom: 0;left: 0;right: 0;
    background: #fff;
}
</style>