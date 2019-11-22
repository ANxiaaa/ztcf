<template>
  <div class="upHead">
    <img ref="img" @click="edit" :src="baseUrl + userData.headImg" alt="">
    <croppa
    v-model="croppa"
    :width="300"
    :height="300"
    placeholder=""
    :accept="'image/*'"
    prevent-white-space
    @init="onInit"
    canvas-color="#fff"
    :show-remove-button="false"
    :replace-drop="true"
    @loading-end="loadingEnd"
    show-loading
    ></croppa>
    <p class="t600" @click="edit">更改头像</p>
    <btn name="保存" @click="save"></btn>
  </div>
</template>

<script>
import upImg from '@/components/input/upImg'
import btn from '@/components/input/btn'
import { baseUrl } from '@/utils/global'
export default {
  name: 'upHead',
  components:{
    upImg,
    btn
  },
  data () {
    return {
      croppa: {},
    }
  },
  methods:{
    edit(){
      this.croppa.chooseFile() // 上传
    },
    save(){
      let fileBase64 = this.croppa.generateDataUrl('image/jpeg', 0.8)
      console.log(fileBase64) // 压缩
      this.$api.user.updateHeadPortrait(fileBase64).then(res=>{
        console.log(res)
        localStorage.getuser = '1'
        this.$router.go(-1)
      })
    },
    getChosenFile(a){
      console.log(a)
    },
    onInit(){
      let _this = this
      this.croppa.addClipPlugin(function (ctx, x, y, w, h) {
        ctx.beginPath()
        ctx.arc(x + w / 2, y + h / 2, w / 2, 0, 2 * Math.PI, true)
        ctx.closePath()
      })
    },
    loadingEnd(){
      this.$refs.img.style.zIndex = '0'
    }
  },
  mounted(){
    this.$store.commit('changeTitle','')
  },
  updated(){
    console.log(this.userData)
  },
  computed:{
    userData(){
      let data = this.$store.getters.userData
      return Object.assign({}, data)
    },
    baseUrl(){
      return baseUrl
    }
  }
}
</script>

<style scoped lang="scss">
.upHead{
  height: 100%;
  padding-top: 1.333333rem;
}
button{
  display: block;
}
img{
    height: 8rem;
    width: 8rem;
    border-radius: 50%;
    margin: auto;
    left: 0;right: 0;
    position: absolute;
    z-index: 3;
}
//----------------------------
.croppa-container{
  height: 8rem;
  width: 8rem;
  margin: auto;
  display: block;
}
p{
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  margin: .4rem;
  color: #333;
  font-size: .4rem;
}
</style>