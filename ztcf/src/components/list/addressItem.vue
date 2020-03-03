<template>
    <div class="addressItem t600">
        <div class="xing">{{addData.name.slice(0, 1)}}</div>
        <div class="main" @click="click(addData)">
            <p class="xinxi">{{addData.name}}<span>{{addData.phone}}</span></p>
            <p>{{addData.province}} {{addData.city}} {{addData.county}} {{addData.address}}</p>
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
        addData: {
            type: Object,
            default: {}
        }
    },
    methods: {
        toSet(){
            console.log(1)
            this.$router.push('/setAddress?set=' + this.addData.id)
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
        click(a){
            this.$emit('click', a)
        }
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
