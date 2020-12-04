<template>
  <div>
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
    <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过5MB </div>
      <div class="description-container" v-bind:class="text_para_class">
        <div v-if="imageUrl" class="bird-img">
          <el-image
          fit="contain"
          :src="imageUrl"
          class="bird">
          </el-image>
        </div>
        <div>{{tips}}</div>
      <el-row :gutter="12" v-bind:class="card_control">
        <el-col :span="14">
          <el-popover
            placement="right"
            title="标题"
            width="400px"
            trigger="manual"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
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
            title="标题"
            width="400px"
            trigger="manual"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
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
            title="标题"
            width="400px"
            trigger="manual"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
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
            title="标题"
            width="400px"
            trigger="manual"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
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
            title="标题"
            width="400px"
            style="height: 300px"
            trigger="manual"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
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
      </el-row>

      </div>

    </div>
    <ibird-footer :pos=pos />
  </div>
</template>

<script>
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import { MessageBox, Message } from 'element-ui'
import { test, identify_result } from '../api/identify-result'

export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-footer': Footer
  },
  data () {
    return {
      imageUrl: '',
      param: {
        'usage': 'p'
      },
      list_status: false,
      result: [[1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1], [1, 1, 1]],
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
      pos: "absolute"
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      // this.imageUrl = 'https://weparallelines.top' + res.data.path

      Message({
        message: res.msg,
        type: 'success',
        duration: 5 * 1000
      })
      this.tips = "识别中";
      this.text_para_class.idf_finish = true;
      this.text_para_class.idf_waiting = false;
      identify_result({
        path: res.data.path
      }).then((response)=>{
        this.pos = "relative";
        this.result = response.data.data.result;
        for (let one=0; one<this.result.length; one++){
          this.birds_img[one] = "https://weparallelines.top//birds/" + String(this.result[one][1]) + ".jpg";
          this.birds_name[one] = this.result[one][0];
          this.birds_reliable[one] = this.result[one][2]
        }
        this.tips = "识别完成"
        this.card_control.card_visible = true;
        this.card_control.card_invisible = false;
      }).catch(()=>{
        this.tips = "识别错误";
      })

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
  mounted () {
    this.v1 = false;
  },
  computed: {}
}
</script>

<style>
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
    width: 400px;
    height: 400px;
    float: left;
  }
  .el-upload__tip {
      position: relative;
      top: 20px;
  }
  .bird-img {
      margin-top: 50px;
      border: ridge;
      border-color: skyblue;
      position: relative;
      display: inline-block;
  }
  .description-container{
    display: inline-block;
    width: 70%;
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
  .el-popover{
    height: 300px;
  }

  .card_invisible {
    display: none;
  }
</style>
