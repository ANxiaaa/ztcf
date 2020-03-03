<template>
    <div class="login">
        <div class="title t600">
            <h5>登录郑泰车服</h5>
            <p>未注册手机号, 验证后将自动注册</p>
        </div>
        <div class="tmpinput">
            <btmborder @getData="getPhone" name="手机号" placeholder="请输入您的手机号"></btmborder>
        </div>
        <div>
            <btmborder @getData="getYzm" name="验证码" placeholder="请输入您收到的验证码">
                <yanzhengma :phone='phone'></yanzhengma>
            </btmborder>
        </div>
        <div class="cz">
            <span v-if="false" class="left" @click="$router.go(-1)">账号密码登录</span>
        </div>
        <btn :disabled="yzm.length !== 6" :style="yzm.length !== 6?'background: #666':''" @click="sub" name="登录"></btn>
        <p class="xieyi" @click="changexieyi">
            <img :src="!xieyi?require('@/assets/no.png'):require('@/assets/yes.png')" alt="">
            <span class="txt">我已阅读<span>《郑泰车服服务协议》</span></span>
        </p>
        <div class="weixin" v-if="false">
            <div>
                <div class="bgline"></div>
                <p class="t600">第三方登录</p>
            </div>
            <div>
                <img :src="require('@/assets/my/login/wxlogin.png')" alt="">
                <span>微信登录</span>
            </div>
        </div>
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
        getPhone(data){
            console.log(data)
            this.phone = data
        },
        getYzm(data){
            console.log(data)
            this.yzm = data
        },
        sub(){
            let data = {
                phone: this.phone,
                sendCode: this.yzm
            }
            this.$api.login.loginOrRegister(data).then(res=>{
                console.log(res)
                let _this = this
                if(res.code == 200){
                    localStorage.isLogin = '1'
                    localStorage.getuser = '1'
                    this.Toast({
                        message: '登录成功',
                        onOpened(){
                            _this.$router.go(-1)
                        }
                    })
                }else {
                    this.Toast.fail(res.msg)
                }
            })
        }
    },
    mounted(){
        this.$store.commit('changeTitle','')
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