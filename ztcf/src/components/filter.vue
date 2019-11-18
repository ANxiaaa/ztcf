<template>
    <div class="searchFilter">
        <ul>
            <li></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'searchFilter',
    data () {
        return {
            filterList: [
                {
                    text: '智能排序',
                    name: 'zhineng',
                    items: [{
                        text: '智能排序',
                        val: 0
                    },{
                        text: '优惠最高',
                        val: 1
                    },{
                        text: '优惠最低',
                        val: 2
                    },{
                        text: '价格最高',
                        val: 3
                    },{
                        text: '价格最低',
                        val: 4
                    }]
                },
                {
                    text: '级别',
                    name: 'jibie',
                    items: [{
                        text: '不限',
                        val: 0
                    },{
                        text: '跑车',
                        val: 0
                    },{
                        text: '轿车',
                        val: 0
                    },{
                        text: '皮卡',
                        val: 0
                    },{
                        text: 'SUV',
                        val: 0
                    },]
                },
                {
                    text: '价格',
                    name: 'price',
                    items: [{
                        text: '不限',
                        val: 0
                    },{
                        text: '10万以下',
                        val: 1
                    },{
                        text: '10万-20万',
                        val: 2
                    },{
                        text: '20万-30万',
                        val: 3
                    },{
                        text: '30万-50万',
                        val: 4
                    },{
                        text: '50万以上',
                        val: 5
                    },]
                },
                {
                    text: '筛选',
                    name: 'filter',
                    items: [{
                        text: '变速箱',
                        name: 'gearbox',
                        list: [{
                            text: '手动挡',
                            name: 'shoudongdang',
                            val: 0
                        },{
                            text: '自动挡',
                            name: 'zidongdang',
                            val: 1
                        }]
                    },{
                        text: '排放标准',
                        name: 'emission',
                        list: [{
                            text: '国六',
                            name: 'guo6',
                            val: 0
                        },{
                            text: '国五',
                            name: 'guo5',
                            val: 1
                        },{
                            text: '国四',
                            name: 'guo4',
                            val: 2
                        }]
                    },{
                        text: '排量',
                        name: 'displacement',
                        list: [{
                            text: '1.3L以下',
                            name: 'power0',
                            val: 0
                        },{
                            text: '1.3L-1.6L',
                            name: 'power1',
                            val: 1
                        },{
                            text: '1.7L-2.0L',
                            name: 'power2',
                            val: 2
                        },{
                            text: '2.1L-3.0L',
                            name: 'power3',
                            val: 3
                        },{
                            text: '3.0L-5.0L',
                            name: 'power4',
                            val: 4
                        },{
                            text: '5.0L以上',
                            name: 'power5',
                            val: 5
                        }]
                    },{
                        text: '能源',
                        name: 'source',
                        list: [{
                            text: '机动车',
                            name: 'motorCar',
                            val: 0
                        },{
                            text: '新能源',
                            name: 'newCar',
                            val: 1
                        }]
                    },{
                        text: '国别',
                        name: 'state',
                        list: [{
                            text: '德系',
                            name: 'germany',
                            val: 0
                        },{
                            text: '日系',
                            name: 'japan',
                            val: 1
                        },{
                            text: '美系',
                            name: 'america',
                            val: 2
                        },{
                            text: '欧系',
                            name: 'europe',
                            val: 3
                        },{
                            text: '韩系',
                            name: 'korea',
                            val: 4
                        },{
                            text: '其他',
                            name: 'others',
                            val: 5
                        }]
                    }]
                }
            ]
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
    }
}
</script>

<style scoped lang="scss">
.searchFilter{
    height: .986667rem;
    border-bottom: .026667rem solid #F2F4F7;
}
</style>
