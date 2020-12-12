<template>
  <div>
    <ibird-nav />
    <el-container style="padding-left: 15% ;padding-right: 15%">
      <el-main>
        <div class="moment-image">
          <div v-if="thumbnail_img">
            <el-image fit="contain"
                      :src="thumbnail_img"
                      :preview-src-list="preview_img"
                      class="upload-image"/>
            <el-button icon="el-icon-close"
                       class="delete-button"
                       v-on:click="deleteImage()"
                       type="info" circle
                       size="mini"/>
          </div>
          <div v-else class="select-image">
            <el-button icon="el-icon-picture" @click="dialogVisible = true">选择图片</el-button>
          </div>
        </div>
        <el-input type="textarea"
                  placeholder="请输入内容"
                  resize="none"
                  rows="12"
                  show-word-limit
                  maxlength="400"
                  v-model="moment"
                  class="moment-text"/>
        <el-button type="danger" class="submit-button" v-on:click="publishMoment()">发表</el-button>
      </el-main>
    </el-container>

    <el-dialog
      title="选择图片"
      :visible.sync="dialogVisible"
      top="10vh"
      width="60%">
      <div class="infinite-list">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-disabled="disabled"
          style="padding: 0"
        >
          <el-row v-for="i in count">
            <el-col :span="8">
              <el-image :src="url_1" fit="contain" class="gallery" v-on:click="selectImage(url_1,url_1)"></el-image>
            </el-col>
            <el-col :span="8">
              <el-image :src="url_2" fit="contain" class="gallery" v-on:click="selectImage(url_2,url_2)"></el-image>
            </el-col>
            <el-col :span="8">
              <el-image :src="url_3" fit="contain" class="gallery" v-on:click="selectImage(url_3,url_3)"></el-image>
            </el-col>
          </el-row>
          <!--            <li v-for="i in count" class="list-item" style="height: 20px">{{ i }}</li>-->
        </ul>
        <p v-if="loading">加载中...</p>
        <p v-if="noMore">没有更多了</p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import IbirdNav from "../components/navbar";
import {give_post} from "../api/post";
import {register} from "../api/account";

export default {
  name: "Publish",
  components: {IbirdNav},
  data() {
    return {
      dialogVisible: false,
      default_img: '../static/img/4444.jpg',
      count: 10,
      loading: false
    }
  },
  props: {
    thumbnail_img: {
      type: String,
    },
    preview_img: {
      type: Array,
    },
    moment: {
      type: String,
    },
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.noMore || this.loading
    },
    // 在这里动态填充图片
    url_1() {
      console.log(this.count);
      return "../static/img/gallery_1.jpeg"
    },
    url_2() {
      return "../static/img/gallery_2.png"
    },
    url_3() {
      return "../static/img/gallery_3.jpg"
    }
  },
  methods: {
    //之后联网
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
    selectImage: function (thumb, preview) {
      this.dialogVisible = false;
      this.thumbnail_img = thumb;
      this.preview_img = [preview];
    },
    deleteImage: function () {
      this.thumbnail_img = '';
      this.preview_img = [];
    },
    publishMoment: function () {
      give_post({
        path: this.thumbnail_img,
        content: this.moment,
      }).then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.$message.success('发布成功！');
          this.deleteImage();
          this.moment='';
        }
        else {
          this.$message.error('发布失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    }
  }
}
</script>

<style scoped>
.moment-image {
  margin-top: 20px;
  float: left;
}

.upload-image {
  width: 300px;
  border: ridge skyblue;
  border-radius: 4px;
}

.moment-text {
  clear: both;
  margin-top: 40px;
  margin-bottom: 60px;
}

.delete-button {
  float: right;
  position: relative;
  top: 8px;
  right: 35px;
  opacity: 0.8;
}

.submit-button {
  width: 20%;
}

.infinite-list {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 450px;
}

.gallery {
  height: 200px;
  margin-bottom: 15px;
}
</style>
