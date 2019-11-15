<template>
    <div class="upImgBox">
        <van-uploader :before-read="bef" :after-read="imgfn" :preview-full-image="false" v-model="imgfile" capture="camera" accept="image/jpeg" :max-count="1" image-fit>
            <slot></slot>
        </van-uploader>
    </div>
</template>

<script>
import axios from 'axios'
import { upLoaderImg } from '@/http/upImg'
export default {
    name: 'btmborder',
    data(){
        return {
            imgfile: []
        }
    },
    methods: {
        bef(file){
            if (file.type !== 'image/jpeg') {
                this.Toast('请上传 jpg 格式图片');
                return false;
            }
            return true
        },
        async imgfn(file){
            console.log(file)
            await upLoaderImg(file.file,'/apis/member/spotDrivingPermit','post').then(res=>{
                this.$emit('getfile', res)
            })
        }
    }
}
</script>

<style scoped>
>>> .van-uploader{
    position: absolute;
    top: 0;left: 0;right: 0;bottom: 0;
    width: auto;height: auto;
}
>>> .van-uploader >>> input{
    position: absolute;
    width: 100%;
    height: 100%;
}
>>> .van-uploader__upload, >>>.van-uploader__preview, >>>.van-uploader__preview-image{
    position: absolute;
    width: 100%;
    height: 100%;
}
>>> .van-uploader .van-uploader__upload{
    opacity: 0;
}
</style>
