<template>
    <div class="carOne t600">
        <van-index-bar>
            <div>
                <van-index-anchor index="A" />
                <van-cell title="文本" />
            </div>
        </van-index-bar>
    </div>
</template>

<script>
export default {
    name: 'carOne',
    props: {
        
    },
    data () {
        return {
            
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