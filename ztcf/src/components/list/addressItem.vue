<template>
    <div class="addressItem t600">
        <div class="xing">高</div>
        <div class="main">
            <p class="xinxi">高女士<span>18744561233</span></p>
            <p>河南省郑州市金水区农业路经三路交叉路口兴业大厦A座1903</p>
        </div>
        <div @click="toSet" class="bianji">
            <img :src="require('@/assets/my/edit.png')" alt="">
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    name: 'addressItem',
    props: {

    },
    data () {
        return {

        }
    },
    methods: {
        toSet(){
            console.log(1)
            this.$router.push('/setAddress')
        },
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
    }
}
</script>

<style scoped lang="scss">
.addressItem{
    position: relative;
    padding: .32rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 500;
    height: .426667rem .4rem;
}
.xing{
    height: .853333rem;
    width: .853333rem;
    line-height: .853333rem;
    text-align: center;
    background: #B8B9BB;
    color: #fff;
    font-size:.4rem;
    border-radius: 50%;
    margin-right: .213333rem;
}
.main{
    flex: 1;
    margin-right: .506667rem;
    font-size: .373333rem;
    line-height: 1;
    color: #999;
    .xinxi{
        color: #333;
        margin-bottom: .2rem;
    }
}
.bianji{
    height: .826667rem;
    width: .906667rem;
    text-align: right;
    border-left: .013333rem solid #EDEEF2;
    img{
        width: .64rem;
        height: .746667rem;
    }
}
.line{
    position: absolute;
    bottom: 0;
    width: 100%;
    height: .026667rem
}
</style>
