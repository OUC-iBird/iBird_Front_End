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
      :destroy-on-close="true"
      width="50%"
    >
      <div class="gallery" >
        <el-scrollbar style="height: 100%;" ref="gcScrollbar" class="table_device">
        <ul
          class="list"
          v-infinite-scroll="load"
          infinite-scroll-delay="500"
          infinite-scroll-disabled="disabled"
          style="padding: 0"
        >
          <div class="home">
            <div class="bannerArr">
              <div class="img-item" v-for="(i,index) in gallary_countData" :key="index" >
                <img fit="contain"  v-on:click="selectImage(banners[index],banners[index])" class="img" :src="banners[index]"/>
              </div>
            </div>
          </div>
          <!--            <li v-for="i in count" class="list-item" style="height: 20px">{{ i }}</li>-->
        </ul>
        <p v-if="!noMore">加载中...</p>
        <p v-else>没有更多数据啦(^_^)</p>
        </el-scrollbar>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import IbirdNav from "../components/navbar";
import {give_post} from '../api/post'
import {get_my_gallery} from "../api/gallary"
import "@/assets/css/scrollbar.css"
export default {
  name: "Publish",
  components: {IbirdNav},
  data() {
    return {
      banners: [],
      gallary_cou: 12,
      gallary_page: 1,
      gallary_hasnext: true,
      dialogVisible: false,
      default_img: '../static/img/4444.jpg',
      loading: false,
      thumbnail_img:'',
      preview_img:[],
      moment:'',
    }
  },
  computed: {
    noMore() {
      return !this.gallary_hasnext;
    },
    disabled() {
      return this.noMore || this.loading
    },
    gallary_countData() {  // 计算属性使用切片生成新数组
      let data = [];
      // 大于x条，使用切片，返回新数组
      if (this.banners.length > 12) {
        data = this.banners.slice(0, this.gallary_cou);
        return data;
      } else {
        // 否则使用原来数组，不进行切片处理
        data = this.banners
        return data;
      }
    },
  },
  methods: {
    //之后联网
    load() {
      if (!this.noMore){
        this.loading = true;
        get_my_gallery(this.gallary_page).then((response)=>{
          if (response.data.code === 20000){
            //成功
            if (!this.gallary_hasnext) return
            for (let i=0;i<response.data.data.count;i++){
              this.banners.push('https://weparallelines.top'+response.data.data.photo[i]);
            }
            if (!response.data.data.has_next) this.gallary_hasnext = false;
            else {
              this.gallary_cou += 12;
              this.gallary_page++;
            }
          }
          else {
            this.$message.error('加载失败：'+response.data.msg);
            this.gallary_hasnext = false;
          }
        }).catch((error)=>{
          this.$message.error('请求时出错！');
          console.log(error);
        })
        this.loading = false
      }
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
      const url = 'https://weparallelines.top';
      let path = this.thumbnail_img.substr(url.length);
      give_post({
        path: path,
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
.gallery {
  height: 60vh;
  overflow: auto;
}
.home {
  margin-left: 42px;
  width: 500px;
  height: 100%;
  position: relative;
  background-color: rgba(53, 52, 54, 0.5);
}
.bannerArr{
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.img-item{
  width: 160px;
  height: 160px;
  padding: 5px;
  margin: 3px;
  box-sizing: border-box;

  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
}
.img{
  width: 100%;
  height: 100%;
  border: 1px solid #E3E3E3;
}
</style>
