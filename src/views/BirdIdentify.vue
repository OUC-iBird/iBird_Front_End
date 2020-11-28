<template>
    <div class="navbar">
    <ibird-nav />
    <el-upload
      class="bird-uploader"
      action="https://weparallelines.top/api/upload"
      name="img"
      :data="param"
      :on-preview="handlePreview"
      :show-file-list="false"
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
              <span class="text-header">识别结果</span>
              <div class="text-para">
                <el-row>
                <el-col :span="12">
                    <div class="grid-content bg-purple">名称</div></el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light">麻雀</div></el-col>
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
export default {
    components: {
        "ibird-nav": NavBar
    },
    data() {
      return {
        imageUrl: '',
        param: {
           "usage": "p",
        },
        default_img: "../static/img/4444.jpg"
      };
    },
    methods: {
      handleAvatarSuccess(res, file) {
        //TODO:这里应该把域名抽出来
        this.imageUrl = "https://weparallelines.top" + res.data.path
        Message({
            message: res.msg,
            type: 'success',
            duration: 5 * 1000
        })
        // this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg');
        const isLt5M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt5M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt5M;
      },
      handlePreview(file) {
        console.log(file);
      }
    }
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
      width: 54%;
      margin-left: 2%;
      margin-right: 2%;
  }
  .text-description .text-header{
      height: 50px;
      display: inline-block;
      line-height: 50px;
  }

  .text-description .text-para {
      border:2px dashed #000000;
      height: 160px;;
  }
  .text-description .text-para .el-row{
      top: 20px;
  }
</style>