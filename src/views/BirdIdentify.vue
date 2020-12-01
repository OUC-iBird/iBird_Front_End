<template>
    <div class="content">
    <ibird-nav />
    <el-upload
      class="bird-uploader"
      action="https://weparallelines.top/api/upload"
      name="img"
      :data="param"
      :on-preview="handlePreview"
      :show-file-list="list_status"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">

      <i class="el-icon-plus bird-uploader-icon"></i>
    </el-upload>
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB</div>
      <div class="description-container">
        <div v-if="imageUrl" class="bird-description">
          <el-image
          fit="contain"
          :src="imageUrl"
          class="bird">
          </el-image>
          <div class="text-description">
              <span class="text-header">{{tips}}</span>
              <div class="text-para" v-bind:class="text_para_class">
                <el-row v-for="i in 5" class="row">
                <el-col :span="16">
                    <div class="grid-content bg-purple">{{result[i-1][0]}}</div></el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple-light">{{result[i-1][2] | toPercent(2)}}</div></el-col>
                </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import NavBar from '../components/navbar'
import { MessageBox, Message } from 'element-ui'
import { test, identify_result } from '../api/identify-result'

export default {
  components: {
    'ibird-nav': NavBar
  },
  data () {
    return {
      imageUrl: '',
      param: {
        'usage': 'p'
      },
      default_img: '../static/img/4444.jpg',
      list_status: false,
      result: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
      tips: "正在识别....",
      text_para_class : {
        idf_waiting: true,
        idf_finish: false,
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = 'https://weparallelines.top' + res.data.path
      Message({
        message: res.msg,
        type: 'success',
        duration: 5 * 1000
      })
      this.tips = "识别中";
      this.text_para_class.idf_finish = false;
      this.text_para_class.idf_waiting = true;
      identify_result({
        path: res.data.path
      }).then((response)=>{
        this.result = response.data.data.result;
        this.text_para_class.idf_finish = true;
        this.text_para_class.idf_waiting = false;
        this.tips = "识别完成"
      })
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!')
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!')
      }
      return isJPG && isLt5M
    },
    handlePreview (file) {
      console.log(file)
    }
  },
}
</script>

<style>
  .bird-uploader .el-upload {
    top: 20px;
    border: 1px dashed #000000;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 600px;
    height: 250px;
  }
  .bird-uploader .el-upload:hover {
    border-color: #6424cc;
  }
  .bird-uploader-icon {
    font-size: 78px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 250px;
    text-align: center;
  }
  .bird-description{
      margin-top: 50px;

  }
  .bird-description .bird {
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 5%;
    width: 200px;
    height: 200px;
    float: left;
  }
  .el-upload__tip {
      position: relative;
      top: 20px;
  }
  .bird-description {
      width: 600px;
      border: ridge;
      border-color: skyblue;
      position: relative;
      display: inline-block;
  }
  .text-description {
      float: left;
      width: 57%;
      margin-left: 2%;
      margin-right: 2%;
  }
  .text-description .text-header{
      height: 37px;
      display: inline-block;
      line-height: 50px;
  }
  .text-description .text-para {
      border:2px dashed #000000;
      height: 180px;
  }
  .text-description .text-para .el-row{
      top: 20px;
  }
  .idf_waiting{
    display: none;
  }
  .text-para .row {
    height: 30px;
  }

</style>
