<template>
    <div class="login">
        <div class="title t600">
            <h5>{{title}}</h5>
            <p>当前账号为: {{userData.phone}}</p>
        </div>
        <div class="tmpinput">
            <btmborder @getData="getPhone" name="手机号" placeholder="请输入您的手机号"></btmborder>
        </div>
        <div>
            <btmborder @getData="getYzm" name="验证码" placeholder="请输入您收到的验证码">
                <yanzhengma :phone="phone"></yanzhengma>
            </btmborder>
        </div>
        <div class="cz"></div>
        <btn :disabled="yzm.length !== 6" name="下一步" :style="yzm.length !== 6?'background: #666':''" @click="sub"></btn>
        <p class="xieyi" @click="changexieyi">
            <img :src="!xieyi?require('@/assets/no.png'):require('@/assets/yes.png')" alt="">
            <span class="txt">我已阅读<span>《郑泰车服服务协议》</span></span>
        </p>
    </div>
</template>

<script>
import btmborder from '@/components/input/btmborder'
import yanzhengma from '@/components/input/yanzhengma'
import btn from '@/components/input/btn'
export default {
    name: 'login',
    components:{
        btmborder,
        yanzhengma,
        btn
    },
    data () {
        return {
            xieyi: true,
            phone: '',
            yzm: ''
        }
    },
    methods:{
        changexieyi(){
            this.xieyi = !this.xieyi
        },
        sub(){
            switch (this.title){
                case '找回密码':
                    this.$router.push('/newpass')
                    console.log(this.title)
                    break;
                case '更改密码':
                    this.$router.push('/setpass?title=更改密码')
                    console.log(this.title)
                    break;
                default:
            }
        },
        getPhone(data){
            console.log(data)
            this.phone = data
        },
        getYzm(data){
            console.log(data)
            this.yzm = data
        }
    },
    mounted(){
        this.$store.commit('changeTitle','')
        console.log(this.$route.query)
    },
    computed: {
        title(){
            return this.$route.query.title || '找回密码'
        },
        isLogin(){
            return localStorage.isLogin
        },
        userData(){
            let data = this.$store.getters.userData
            return Object.assign({}, data)
        }
    }
}
</script>

<style scoped lang="scss">
.login{
    width: 8rem;
    margin: auto;
    height: 100%;
}
.title{
    margin-bottom: 1.68rem;
    padding-top: 1.066667rem;
    h5{
        font-size:.64rem;
        color:#333333;
        font-weight: bold;
    }
    p{
        font-size:.32rem;
        color:#999;
        height: .45rem;
    }
}
.tmpinput{
    margin-bottom: .626667rem;
}
.cz{
    display: flex;
    justify-content: space-between;
    margin-top: .306667rem;
    font-family:PingFang SC;
    font-weight:500;
    margin-bottom: 1.066667rem;
    height: .42rem;
    .left{
        font-size:.32rem;
        color:#4771E6;
    }
    .right{
        font-size:.32rem;
    }
}
.xieyi{
    margin-top: .48rem;
    display: flex;
    justify-content: center;
    img{
        height: .4rem;
        width: .4rem;
        margin-right: .133333rem;
    }
    span{
        font-size:.32rem;
        font-family:PingFang SC;
        font-weight:500;
        color: #999999;
        line-height: .4rem
    }
}
.weixin{
    margin: 1.866667rem auto 0;
    text-align: center;
    width: 5.2rem;
    position: relative;
    .bgline{
        height: .026667rem;
        position: absolute;
        top: .133333rem;
        width: 100%;
        background: #EDEFF2;
    }
    p{
        padding: 0 .213333rem;
        font-size:.32rem;
        background: #fff;
        position: absolute;
        left: 0;
        right: 0;
        margin: auto;
        width: 2.3rem;
        text-align: center;
        z-index: 1;
        font-size:.32rem;
        color: #999;
        margin-bottom: .533333rem;
    }
    img{
        padding-top: .9rem;
        margin: auto;
        display: block;
        height: .933333rem;
        width: .933333rem;
        box-sizing: content-box;
        margin-bottom: .133333rem;
    }
    span{
        font-size:.32rem;
        font-family:PingFang SC;
        font-weight:500;
        color:#666;
    }
}
</style>