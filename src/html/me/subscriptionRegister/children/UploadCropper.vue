<style>
  .cropper-bg {
    background-image: none
  }
</style>
<template>
  <div class="v-simple-cropper needsclick">
    <slot>
<!--      <button @click="upload"></button>-->
    </slot>
    <input class="file needsclick" ref="file" type="file" accept="image/*" @change="uploadChange">
    <div class="v-cropper-layer" ref="layer">
      <div class="layer-header" style=" background-color:rgba(0,0,0,0);">
        <div>
          <x-button type="default" text="取消" @click.native="cancelHandle"
                    style="display: inline;width: 88px;float: left"></x-button>
        </div>
        <div>
          <x-button type="primary" text="确定" @click.native="confirmHandle"
                    style="display: inline;width: 88px;float: right"></x-button>
        </div>
      </div>
      <img ref="cropperImg">
    </div>
  </div>
</template>

<script>
  import Cropper from 'cropperjs'
  import 'cropperjs/dist/cropper.min.css'
  import Exif from 'exif-js'
  import {XButton} from 'vux'
  import qs from 'qs'
  import { Toast } from "mint-ui";
  export default {
    name: 'v-simple-cropper',
    props: {
      initparam: {
        type: Object
      },
      successCallback: {
        type: Function,
        default: () => {
        }
      }
    },
    data() {
      return {
        cropper: {},
        filename: '',
        fileDatas: '',
      }
    },
    components: {
      XButton
    },
    mounted() {
      this.init()
    },
    methods: {
      // 初始化裁剪插件
      init() {
        let cropperImg = this.$refs['cropperImg']
        this.cropper = new Cropper(cropperImg, {
          aspectRatio: 1 / 1,
          dragMode: 'move'
        })
      },
      // 点击上传按钮
      upload() {
        this.$refs['file'].click()
      },
      rotateImg(img, direction, canvas) {
        //最小与最大旋转方向，图片旋转4次后回到原方向
        const min_step = 0
        const max_step = 3
        if (img == null) return
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        let height = img.height
        let width = img.width
        let step = 2
        if (step == null) {
          step = min_step
        }
        if (direction == 'right') {
          step++
          //旋转到原位置，即超过最大值
          step > max_step && (step = min_step)
        } else {
          step--
          step < min_step && (step = max_step)
        }
        //旋转角度以弧度值为参数
        let degree = step * 90 * Math.PI / 180
        let ctx = canvas.getContext('2d')
        switch (step) {
          case 0:
            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0)
            break
          case 1:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, 0, -height)
            break
          case 2:
            canvas.width = width
            canvas.height = height
            ctx.rotate(degree)
            ctx.drawImage(img, -width, -height)
            break
          case 3:
            canvas.width = height
            canvas.height = width
            ctx.rotate(degree)
            ctx.drawImage(img, -width, 0)
            break
        }
      },
      // 选择上传文件
      uploadChange(e) {
        var self = this
        let file = e.target.files[0]
        this.imgPreview(file)
      },
      imgPreview(file) {
        var maxSize = 200 * 1024
        let self = this
        let Orientation;
        //去获取拍照时的信息，解决拍出来的照片旋转问题
        Exif.getData(file, function(){
          Orientation = Exif.getTag(this, 'Orientation');})

        this.filename = file['name']
        let reader = new FileReader()
        reader.readAsDataURL(file);
        reader.onload = function () {
          var result = this.result  //result为data url的形式
          let img = new Image()
          img.src = result
          if (result.length < maxSize) {
            let blob = self.dataURLtoBlob(img.src )
            let file = self.blobToFile(blob, self.filename)
            let URL = window.URL || window.webkitURL
            self.$refs['layer'].style.display = 'block'
            self.cropper.replace(URL.createObjectURL(file))
          } else {
            img.onload = function() {
              self.compress(img,Orientation)
            }
          }
        }
      },
      compress(img, Orientation) {
        var self = this
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        //瓦片canvas  
        let tCanvas = document.createElement("canvas");
        let tctx = tCanvas.getContext("2d");
        let initSize = img.src.length;
        let width = img.width;
        let height = img.height;
        //如果图片大于四百万像素，计算压缩比并将大小压至400万以下  
        let ratio;
        if ((ratio = width * height / 4000000) > 1) {
          console.log("大于400万像素")
          ratio = Math.sqrt(ratio);
          width /= ratio;
          height /= ratio;
        } else {
          ratio = 1;
        }
        canvas.width = width;
        canvas.height = height;
        //        铺底色  
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //如果图片像素大于100万则使用瓦片绘制  
        let count;
        if ((count = width * height / 1000000) > 1) {
          console.log("超过100W像素");
          count = ~~(Math.sqrt(count) + 1); //计算要分成多少块瓦片  
          //            计算每块瓦片的宽和高  
          let nw = ~~(width / count);
          let nh = ~~(height / count);
          tCanvas.width = nw;
          tCanvas.height = nh;
          for (let i = 0; i < count; i++) {
            for (let j = 0; j < count; j++) {
              tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
              ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
            }
          }
        } else {
          ctx.drawImage(img, 0, 0, width, height);
        }
        //修复ios上传图片的时候 被旋转的问题  
        if(Orientation != "" && Orientation != 1){
          switch(Orientation){
            case 6://需要顺时针（向左）90度旋转  
              this.rotateImg(img,'left',canvas);
              break;
            case 8://需要逆时针（向右）90度旋转  
              this.rotateImg(img,'right',canvas);
              break;
            case 3://需要180度旋转  
              this.rotateImg(img,'right',canvas);//转两次  
              this.rotateImg(img,'right',canvas);
              break;
          }
        }
        //进行最小压缩  
        let ndata = canvas.toDataURL('image/jpeg', 0.8);
        tCanvas.width = tCanvas.height = canvas.width = canvas.height = 0;
          let blob = self.dataURLtoBlob(ndata)
          let file = self.blobToFile(blob, self.filename)
          let URL = window.URL || window.webkitURL
          self.$refs['layer'].style.display = 'block'
          self.cropper.replace(URL.createObjectURL(file))

      },
      // 取消上传
      cancelHandle() {
        this.cropper.reset()
        this.$refs['layer'].style.display = 'none'
        this.$refs['file'].value = ''
      },
      dataURLtoBlob(dataurl) {
        var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n)
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n)
        }
        return new Blob([u8arr], {type: mime})
      },
      //将blob转换为file
      blobToFile(theBlob, fileName) {
        theBlob.lastModifiedDate = new Date()
        theBlob.name = fileName
        return theBlob
      },
      //调用
      // 确定上传
      confirmHandle() {
        let cropBox = this.cropper.getCropBoxData()
        let scale = this.initparam.scale || 1
        let cropCanvas = this.cropper.getCroppedCanvas({
          width: cropBox.width,
          height: cropBox.height
        })
        var formData = new FormData()
        let imgData = cropCanvas.toDataURL('image/jpeg')
        let newimage = imgData.substring(23,imgData.length)
        var blob = this.dataURLtoBlob(imgData)
        var file = this.blobToFile(blob, this.filename)
        let obj = {
          picStr: newimage
        }
        this.axios({
          method:"post",
          url:this.apis.theme.api.subscription.uploadIcon,
          data:qs.stringify(obj)
        })
        .then(res => {
          if(res.data.status == 1){
            this.successCallback(res.data.result);
            this.cropper.reset()
            this.$refs['layer'].style.display = 'none'
            this.$refs['file'].value = ''
          }else{
            Toast('请重新上传！')
          }
          
          
        })
      }
    }
  }
</script>

<style lang="less">
  .v-simple-cropper {
    .file {
      display: none;
    }
    .v-cropper-layer {
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: #fff;
      z-index: 99999;
      display: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      .layer-header {
        position: fixed;
        bottom: 1rem;
        left: 0;
        z-index: 99999;
        background: #fff;
        width: 100%;
        height: .8rem;
        padding: 0 .2rem;
        /*box-sizing: border-box;*/
      }
      .cancel,
      .confirm {
        line-height: .8rem;
        font-size: .28rem;
        background: inherit;
        border: 0;
        display: inline-block;
        outline: 0;
        float: left;
      }
      .confirm {
        float: right;
      }
      img {
        position: inherit !important;
        border-radius: inherit !important;
        float: inherit !important;
      }
    }
  }
</style>
