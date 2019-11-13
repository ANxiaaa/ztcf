<template>
    <button class="yzm" :disabled="loading" @touchstart="down" @touchend="up" @click.stop="click">{{getyzm?'获取验证码':`重新获取 ${time}`}}</button>
</template>

<script>
export default {
    name: 'yanzhengma',
    props:{
        phone: {
            type: String,
            default: ''
        },
        oldPhone: {
            type: String,
            default: ''
        },
    },
    data(){
        return {
            getyzm: true,
            time: 60,
            interval: null,
            loading: false
        }
    },
    mounted(){
        console.log(this.disabled)
    },
    computed:{
        userData(){
            let data = this.$store.getters.userData
            return Object.assign({}, data)
        }
    },
    methods: {
        down(a){
            if(this.getyzm){
                a.target.style.background = '#4771E6'
                a.target.style.color = '#fff'
            }
        },
        up(a){
            if(this.getyzm){
                a.target.style.background = 'none'
                a.target.style.color = '#4771E6'
            }
        },
        click(a){
            if(this.$route.query.title === '更改手机号' && this.userData.phone !== this.oldPhone){
                this.Toast.fail('请输入正确的初始手机号')
                return
            }
            if(!/^1[3456789]\d{9}$/.test(this.phone)){
                this.Toast.fail('请输入正确的新手机号')
                return
            }
            if(this.oldPhone === this.phone){
                this.Toast.fail('手机号码重复')
                return
            }
            this.loading = true
            a.target.style.borderColor = '#999'
            a.target.style.color = '#999'
            this.$api.login.sendCode(this.phone).then(res=>{
                this.getyzm = false
                let time = this.time
                /* 发送请求, 如果失败, 复原, 成功发送 进入计时*/
                this.interval = setInterval(()=>{
                    if(this.time > 1){
                        this.time --
                    }else{
                        a.target.style.color = '#4771E6'
                        a.target.style.borderColor = '#4771E6'
                        this.getyzm = true
                        this.loading = false
                        this.time = time
                        clearInterval(this.interval)
                    }
                }, 1000)
                console.log(res)
            }).catch(err=>{
                this.Toast('获取失败, 请重试')
                a.target.style.color = '#4771E6'
                a.target.style.borderColor = '#4771E6'
                this.getyzm = true
                this.loading = false
            })
        },
    }
}
</script>

<style scoped lang="scss">
.yzm{
    display: block;
    width:2.133333rem;
    height:.64rem;
    border:.026667rem solid #4771E6;
    color: #4771E6;
    border-radius:.32rem;
    background: none;
    font-size:.32rem;
}
</style>
