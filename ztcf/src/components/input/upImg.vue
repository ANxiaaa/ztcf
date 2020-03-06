<template>
    <div class="upImgBox">
        <van-uploader :before-read="bef" :after-read="imgfn" @click.stop :preview-full-image="false" v-model="imgfile" capture="camera" accept="image/jpeg" :max-count="1" image-fit @before-delete="beforeDelete">
            <slot></slot>
        </van-uploader>
        <van-popup v-model="uploading" :style="popStyle"><van-loading color="#1989fa"/></van-popup>
    </div>
</template>

<script>
import { upLoaderImg } from '@/http/upImg'
export default {
    name: 'btmborder',
    props: {
        upUrl: {
            type: String,
            default: '/apis/member/spotDrivingPermit'
        }
    },
    data(){
        return {
            uploading: false,
            imgfile: [],
            popStyle: {
                height: '3rem',
                width: '5rem',
                borderRadius: '.5rem',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }
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
            this.uploading = true
            return await upLoaderImg(file.file,this.upUrl,'post').then(res=>{
                this.$emit('getfile', res)
                this.uploading = false
            })
        },
        beforeDelete(){
            this.$emit('beforeDelete')
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
