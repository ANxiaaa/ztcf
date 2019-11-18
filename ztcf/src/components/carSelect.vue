<template>
    <div class="carSelect t600">
        <van-index-bar :index-list="indexList" highlight-color="#2E6BE6">
            <div>
                <van-index-anchor index="A" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="B" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="C" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="D" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="E" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="F" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="G" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="H" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="I" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="J" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
            <div>
                <van-index-anchor index="K" />
                <van-cell title="文本" />
                <van-cell title="文本" />
                <van-cell title="文本" />
            </div>
        </van-index-bar>
    </div>
</template>

<script>
export default {
    name: 'myTitle',
    props: {
        
    },
    data () {
        return {
            indexList: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        }
    },
    methods: {
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
    },
    mounted(){
        
    }
}
</script>

<style scoped lang="scss">
.carSelect{
    width: 10rem;
    margin: auto;
    position: relative;
    font-weight: 500;
}
</style>
<style scoped>
>>> .van-index-bar__sidebar span{
    font-size:.346667rem;
    color: #999;
    font-family: Arial, Helvetica, sans-serif;
    line-height: .54rem;
}
</style>