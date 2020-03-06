<template>
    <div class="clickFilter">
        <ul ref="list">
            <li class="paixu" :class="{active: paixu.show}" @click.stop="changeShow(paixu)">
                <p>{{paixu.text}}</p>
            </li>
            <li class="paixu" :class="{active: youhui.active}" @click.stop="changeShow(youhui)">
                <p>{{youhui.text}}<img :src="require(`@/assets/sx${youhui.active}.png`)" alt=""></p>
            </li>
            <li class="paixu" :class="{active: jiage.active}" @click.stop="changeShow(jiage)">
                <p>{{jiage.text}}<img :src="require(`@/assets/sx${jiage.active}.png`)" alt=""></p>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'clickFilter',
    data () {
        return {
            paixu: {
                text: '智能排序',
                active: false,
                show: true
            },
            youhui: {
                text: '优惠力度',
                value: 'discount',
                index: 1,
                active: 0
            },
            jiage: {
                text: '价格排序',
                value: 'show_cost',
                index: 2,
                active: 0
            }
        }
    },
    methods: {
        changeShow(a){
            console.log(1)
            let sendData = {
                paixu: false,
                value: '',
                active: 0
            }
            if(a.show !== undefined){
                this.$set(this.youhui, 'active', 0)
                this.$set(this.jiage, 'active', 0)
                if(!a.show){
                    this.$set(a, 'show', true)
                    sendData.paixu = a.show
                    this.$emit('getSend', sendData)
                }
            }else{
                this.$set(this.paixu, 'show', false)
                if(a.index == 1)this.$set(this.jiage, 'active', 0)
                if(a.index == 2)this.$set(this.youhui, 'active', 0)
                if(a.active < 2){
                    this.$set(a, 'active', a.active + 1)
                }else{
                    this.$set(a, 'active', 0)
                    this.$set(this.paixu, 'show', true)
                    sendData.paixu = true
                }
                sendData.value = a.value
                sendData.active = a.active
                this.$emit('getSend', sendData)
            }
        }
    }
}
</script>

<style scoped lang="scss">
.clickFilter{
    height: .986667rem;
    border-bottom: .026667rem solid #F2F4F7;
    border-top: .026667rem solid #F2F4F7;
    ul{
        position: relative;
        display: flex;
        z-index: 11;
        li.active p{
            color: #2E6BE6;
        }
        li{
            flex: 1;
            height: 100%;
            text-align: center;
            p{
                font-size: .32rem;
                line-height: .986667rem;
                img{
                    height: .213333rem;
                    width: .213333rem;
                    margin-left: .066667rem;
                }
            }
        }
    }
}
</style>
