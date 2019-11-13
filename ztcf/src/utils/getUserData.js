import api from '@/http/api'

export const getUserData = () => {
    if(localStorage.isLogin){
        api.login.getMemberInfo().then(res=>{
            console.log(res)
            localStorage.userData = JSON.stringify(res.data)
        })
    }
}