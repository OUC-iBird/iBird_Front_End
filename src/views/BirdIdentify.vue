<template>
  <div>
    <ibird-nav />
    <div class="content">
    <el-upload
      class="bird-uploader"
      action="https://weparallelines.top/api/upload"
      name="img"
      :on-preview="handlePreview"
      :show-file-list=false
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
    >


      <i class="el-icon-plus bird-uploader-icon"></i>
    </el-upload>
      <el-dialog title="图片剪裁" :visible.sync="dialogVisible" top="4vh">
        <div class="cropper-content">
          <div class="cropper" style="text-align:center">
            <vueCropper
              ref="cropper"
              :img="option.img"
              :outputSize="option.outputSize"
              :outputType="option.outputType"
              :info="option.info"
              :canScale="option.canScale"
              :autoCrop="option.autoCrop"
              :autoCropWidth="option.autoCropWidth"
              :autoCropHeight="option.autoCropHeight"
              :fixed="option.fixed"
              :fixedBox="option.fixedBox"
              :fixedNumber="option.fixedNumber"
            ></vueCropper>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
        </div>
      </el-dialog>

    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB </div>
      <div class="description-container" v-bind:class="text_para_class">
        <div v-if="imageUrl" class="bird-img">
          <el-image
            fit="contain"
            :src="imageUrl"
            class="bird">
          </el-image>
          <div>{{tips}}</div>
        </div>
      <div class="container">
        <el-row :gutter="12" v-bind:class="card_control">
        <el-col :span="14">
          <el-popover
            placement="right"
            :title=birds_name[0]
            width="400px"
            trigger="manual"
            :content=this.birds_description[0]
            v-model="v1">
            <div slot="reference"
                 class="card-trigger"
                 @click="v1 = !v1"
                 @mouseenter="v1 = true"
                 @mouseleave="v1 = false">
              <el-card shadow="always"
                       class="bird-card">
                <el-image
                  :src="birds_img[0]"
                  fit="contain"
                  class="example">
                </el-image>
                <span class="bird-name">{{birds_name[0]}}</span>
                <i class="reliable-number">{{birds_reliable[0]|toPercent}}</i>
              </el-card>
            </div>
          </el-popover>

        </el-col>
      </el-row>

      <el-row :gutter="12" v-bind:class="card_control">
        <el-col :span="14">
          <el-popover
            placement="right"
            :title=birds_name[1]
            width="400px"
            trigger="manual"
            :content=this.birds_description[1]
            v-model="v2">
            <div slot="reference"
                 class="card-trigger"
                 @click="v2 = !v2"
                 @mouseenter="v2 = true"
                 @mouseleave="v2 = false">
              <el-card shadow="always"
                       class="bird-card">
                <el-image
                  :src="birds_img[1]"
                  fit="contain"
                  class="example">
                </el-image>
                <span class="bird-name">{{birds_name[1]}}</span>
                <i class="reliable-number">{{birds_reliable[1]|toPercent}}</i>
              </el-card>
            </div>
          </el-popover>

        </el-col>
      </el-row>

      <el-row :gutter="12" v-bind:class="card_control">
        <el-col :span="14">
          <el-popover
            placement="right"
            :title=birds_name[2]
            width="400px"
            trigger="manual"
            :content=this.birds_description[2]
            v-model="v3">
            <div slot="reference"
                 class="card-trigger"
                 @click="v3 = !v3"
                 @mouseenter="v3 = true"
                 @mouseleave="v3 = false">
              <el-card shadow="always"
                       class="bird-card">
                <el-image
                  :src="birds_img[2]"
                  fit="contain"
                  class="example">
                </el-image>
                <span class="bird-name">{{birds_name[2]}}</span>
                <i class="reliable-number">{{birds_reliable[2]|toPercent}}</i>
              </el-card>
            </div>
          </el-popover>

        </el-col>
      </el-row>

      <el-row :gutter="12" v-bind:class="card_control">
        <el-col :span="14">
          <el-popover
            placement="right"
            :title=birds_name[3]
            width="400px"
            trigger="manual"
            :content=this.birds_description[3]
            v-model="v4">
            <div slot="reference"
                 class="card-trigger"
                 @click="v4 = !v4"
                 @mouseenter="v4 = true"
                 @mouseleave="v4 = false">
              <el-card shadow="always"
                       class="bird-card">
                <el-image
                  :src="birds_img[3]"
                  fit="contain"
                  class="example">
                </el-image>
                <span class="bird-name">{{birds_name[3]}}</span>
                <i class="reliable-number">{{birds_reliable[3]|toPercent}}</i>
              </el-card>
            </div>
          </el-popover>

        </el-col>
      </el-row>

      <el-row :gutter="12" v-bind:class="card_control">
        <el-col :span="14">
          <el-popover
            placement="right"
            :title=birds_name[4]
            width="400px"
            style="height: 300px"
            trigger="manual"
            :content=this.birds_description[4]
            v-model="v5">
            <div slot="reference"
                 class="card-trigger"
                 @click="v5 = !v5"
                 @mouseenter="v5 = true"
                 @mouseleave="v5 = false">
              <el-card shadow="always"
                       class="bird-card">
                <el-image
                  :src="birds_img[4]"
                  fit="contain"
                  class="example">
                </el-image>
                <span class="bird-name">{{birds_name[4]}}</span>
                <i class="reliable-number">{{birds_reliable[4]|toPercent}}</i>
              </el-card>
            </div>
          </el-popover>

        </el-col>
        <el-col class="uploadtogallary">
          <el-button type="primary" class="submit-button" v-on:click="uploadToGallary()">保存至相册</el-button>
        </el-col>
      </el-row>
      </div>
      </div>

    </div>
  </div>
</template>

<script>
import NavBar from '../components/navbar'
import { MessageBox, Message } from 'element-ui'
import { test, identify_result, img_upload } from '../api/identify-result'
import {save_in_gallery} from "../api/gallary";

export default {
  components: {
    'ibird-nav': NavBar,
  },
  data () {
    return {
      imageUrl: '',
      remoteUrl: '',
      imgName: "",
      tips: "正在识别....",
      text_para_class : {
        idf_waiting: true,
        idf_finish: false,
      },
      card_control: {
        card_visible: false,
        card_invisible: true,
      },
      birds_img: [
        "",
        "",
        "",
        "",
        ""
      ],
      v1: false,
      v2: false,
      v3: false,
      v4: false,
      v5: false,
      birds_name : ["", "", "", "", ""],
      birds_reliable: ["0.00", "0.00", "0.00", "0.00", "0.00"],
      birds_description : ["", "", "", "", ""],
      dialogVisible: false,
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 1, // 裁剪生成图片的质量
        outputType: 'png', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 300, // 默认生成截图框宽度
        autoCropHeight: 300, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        infoTrue: true, // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
        canMove:true,
        enlarge: 2,
      },
      loading: false
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
    },
    beforeAvatarUpload (file) {
      // const isJPG = 1;
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
      const isLt5M = file.size / 1024 / 1024 < 5
      this.card_control.card_invisible = true;
      this.card_control.card_visible = false;
      this.text_para_class.idf_waiting = true;
      this.text_para_class.idf_finish = false;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      if (isJPG && isLt5M){
        this.$nextTick(() => {
          this.imgName = file.name;
          this.option.img = URL.createObjectURL(file);
          this.dialogVisible = true
        })
      }
      return false;
    },
    handlePreview (file) {
      console.log(file)
    },
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        let form = new FormData();
        let file = new window.File(
          [data],
          "uploader.png",
          {type: "image/png"}
          );
        console.log(file);
        form.append('img', file);
        form.append('usage', 'p');
        this.loading = true;
        img_upload(form).then((res)=>{
          if (res.data.code !== 20000){
            Message({
              message: res.data.msg,
              type: 'error',
              duration: 3000
            })
            this.loading = false;
            this.dialogVisible = false
            return
          }
          this.imageUrl = URL.createObjectURL(file);
          this.loading = false;
          this.dialogVisible = false
          Message({
            message: "上传成功",
            type: 'success',
            duration: 1000
          })
          this.tips = "识别中";
          this.text_para_class.idf_finish = true;
          this.text_para_class.idf_waiting = false;
          this.remoteUrl = res.data.data.path;
          console.log(res);
          console.log(res.data.data.path);
          identify_result({
            path: res.data.data.path
          }).then((response)=>{
            this.result = response.data.data.result;
            for (let one=0; one<this.result.length; one++){
              this.birds_img[one] = "https://weparallelines.top/birds/" + String(this.result[one].id) + ".jpg";
              this.birds_name[one] = this.result[one].label;
              this.birds_reliable[one] = this.result[one].probability;
              this.birds_description[one] = this.result[one].info;
            }
            this.tips = "识别完成"
            this.card_control.card_visible = true;
            this.card_control.card_invisible = false;
          }).catch(()=>{
            this.tips = "识别错误";
            this.loading = false;
          });
      }).catch(()=>{
          Message({
            message: "失败",
            type: 'error',
            duration: 1000
          });
          console.log(error);
        })

    })
    },
    uploadToGallary(){
      save_in_gallery({
        path: this.remoteUrl,
        longitude: 0.0,
        latitude: 0.0
      }).then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.$message.success('上传成功！');
        }
        else {
          this.$message.error('上传失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    }
  },
  mounted () {
    this.v1 = false;
  },
  computed: {},
}
</script>

<style scoped>
  .content {
    text-align: center;
  }
  .bird-uploader {
    top: 20px;
    border: 1px dashed #000000;
    border-radius: 6px;
    position: relative;
    overflow: hidden;
    width: 50%;
    height: 250px;
    display: inline-block;
  }
  .bird-uploader-icon {
    font-size: 78px;
    color: #8c939d;
    height: 178px;
    line-height: 250px;
    text-align: center;
  }
  .bird-img .bird {
    width: 280px;
    height: 280px;
    float: left;
  }
  .el-upload__tip {
      position: relative;
      top: 20px;
  }
  .bird-img {
      margin-top: 50px;
      /*border: ridge;*/
      /*border-color: skyblue;*/
      position: relative;
      display: inline-block;
  }
  .description-container{
    display: inline-block;
    width: 70%;
  }
  .container {
    margin-left: 100px;
  }
  .idf_waiting{
    display: none;
  }
  .example {
    float: left;
    width: 100px;
    height: 100px;
  }
  .expander-arrow {
    cursor: default;
    float: right;
    margin-left: 10px;
  }
  .bird-card {
    height: 140px;
  }
  .card-trigger {
    height: 100%;
    width: 100%;
  }
  .bird-name {
    margin-top: 45px;
    font-size: 30px;
    height: 40px;
    top: 50px;
    display: inline-block;
  }
  .reliable-number {
    font-size: 25px;
    float: right;
  }
  .card_visible {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .card_invisible {
    display: none;
  }
  .cropper-content{
    width:450px;
    height:450px;
    display: inline-block;
  }
  .cropper{
    width:450px;
    height:450px;
  }
  .submit-button{
    margin-top: 20px;
  }
</style>

<style>
.el-popover{
  height: 300px;
  min-height: 300px;
  width: 400px;
}
</style>
