<template>
    <div class="login">
        <div class="title t600">
            <h5>找回密码</h5>
            <p>当前账号为: {{userName}}</p>
        </div>
        <div class="tmpinput">
            <btmborder type="password" @getData="getNewPass" name="新密码" placeholder="请输入您的新密码"></btmborder>
        </div>
        <div>
            <btmborder type="password" @getData="getPass" name="确认新密码" placeholder="请再次输入您的密码"></btmborder>
        </div>
        <div class="cz"></div>
        <btn name="确认" @click="sub"></btn>
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
            userName: 13344445555,
            newPass: '',
            pass: ''
        }
    },
    methods:{
        changexieyi(){
            this.xieyi = !this.xieyi
        },
        sub(){
            if(this.newPass === '' || this.pass === ''){
                this.Toast.fail('请输入密码!')
            }else if(!/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9~!@&%#_]{8,16}$/.exec(this.pass)){
                this.Toast({
                    message: '必须包含一个大写，一个小写字母，且长度为8到16位!',
                    duration: 2000
                })
            }else if(this.newPass !== this.pass){
                this.Toast.fail('两次密码输入不一致!')
            }else{
                console.log(this.newPass)
                console.log(this.pass)
            }
        },
        getNewPass(data){
            console.log(data)
            this.newPass = data
        },
        getPass(data){
            console.log(data)
            this.pass = data
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