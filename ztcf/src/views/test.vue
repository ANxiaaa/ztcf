<template>
    <div class="test">
        <input type="file" @click="clickInputLoader">
        <p>测试界面</p>
        <img :src="'data:image/png;base64' + base64" alt="">
    </div>
</template>

<script>
import { upLoaderImg } from '@/http/upImg'
export default {
    name: 'login',
    components:{
    },
    data () {
        return {
            base64: ''
        }
    },
    methods:{
        clickInputLoader() {
            let _this = this
            if (~navigator.userAgent.indexOf("Html5Plus")) {
                let plusReady = function(callback) {
                    if (window.plus) {
                        callback();
                    } else {
                        document.addEventListener("plusready", callback);
                    }
                };
                plusReady(function() {
                    let camera = plus.camera.getCamera(); // 调用相机
                    camera.captureImage(
                    function(filePath) {
                        plus.io.resolveLocalFileSystemURL( // 通过URL参数获取目录对象或文件对象
                            filePath,
                            function(entry) {
                                _this.lodingShow = true;
                                let reader = null
                                entry.file(function(file) {
                                    reader = new plus.io.FileReader(); // 文件系统中的读取文件对象，用于获取文件的内容
                                    reader.readAsDataURL(file);
                                    reader.onloadend = async function(e) {
                                        let dataBase = e.target.result; // 获取Base64，FileReader()返回
                                        _this.base64 = dataBase
                                        let imgfile = _this.dataURLtoFile('data:image/png;base64' + dataBase, 'up.jpeg')
                                        console.log(imgfile)
                                        return await upLoaderImg(imgfile, '/apis/member/spotDrivingPermit', 'post').then(res=>{
                                        console.log(res)
                                    })
                                },function (e) {
                                    alert( e.message );
                                };
                            });
                        },
                        function(e) {
                            plus.nativeUI.toast("读取拍照文件错误：" + e.message);
                        });
                    },
                    function() {
                        alert("拍照失败");
                    });
                });
            }
        },
        dataURLtoFile(dataurl, filename) {//将base64转换为文件
            var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new File([u8arr], filename, {type:mime});
        }
    },
    mounted(){
    }
}
</script>

<style scoped lang="scss">
</style>