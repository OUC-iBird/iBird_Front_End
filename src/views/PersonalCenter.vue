<template>
  <div class="content">
    <ibird-nav />
    <div class="center-banner">
      <el-image
        :src="src"
        fill="fill"
        class="banner-img">
      </el-image>
    </div>
    <div class="avatar-img" v-if="infoloaded" @click="dialogVisible = true">
      <el-tooltip effect="dark" content="点击可修改头像" placement="top" :open-delay="500">
        <el-avatar :size="130" :src="avatarUrl" style="border: 2px solid #ffffff;"/>
      </el-tooltip>
    </div>
    <div class="user-name" v-if="infoloaded">
      <span style="position: relative">
        {{displayName}}
         <el-popover
           placement="right"
           width="200"
           trigger="manual"
           class="change_name"
           v-model="changenameVisible">
           <el-input
             placeholder="请输入要更改的昵称"
             v-model="nametoChange"
             maxlength="10"
           />
           <div style="text-align: right; margin: 10px 0 0;">
             <el-button size="mini" type="text" @click="changenameVisible = false">取消</el-button>
             <el-button type="primary" size="mini" @click="changeNickname()">确定</el-button>
           </div>
           <el-button slot="reference" type="text" icon="el-icon-edit" class="name-btn"
                      @click="changenameVisible = !changenameVisible"/>
         </el-popover>
      </span>
    </div>

    <el-tabs
      tab-position="right"
      class="card-selector"
    >
      <el-tab-pane>
        <span slot="label">
          <el-image class="icon-img"
                    :src="src1"
                    fill="fill"/>
          <span class="tip">个人动态</span></span>
        <el-scrollbar class="infinite-list-wrapper" style="overflow:auto; overflow-x: hidden;"
                      v-bind:style="{height:getClientHeight}">
          <div v-infinite-scroll="loadMoments"
               infinite-scroll-delay="500"
               infinite-scroll-distance="200"
               infinite-scroll-disabled="moments_disabled">
            <el-row v-for="(i,index) in moments_countData" :key="index" class="card1-item">
              <el-col :span="20" :push="4">
                <ibird-moments
                  class="moment-card"
                  v-bind:username=moments[index].username
                  v-bind:moment=moments[index].content
                  v-bind:thumbnail_img=moments[index].path
                  v-bind:avatar=moments[index].avatar
                  v-bind:ptime=moments[index].create_time
                  v-bind:pid=moments[index].post_id
                  v-bind:location=moments[index].address
                  v-bind:thumb=
                    {thumb_num:moments[index].like,thumb_visible:true,thumb_status:moments[index].is_liked|false,}
                /></el-col>
            </el-row>
            <p v-if="!moments_noMore" style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">加载中……</p>
            <p v-else style="color: #555555;font-size: 14px;margin-top:30px;margin-bottom: 50px;">没有更多数据啦(^_^)</p>
          </div>
        </el-scrollbar>
      </el-tab-pane>
      <el-tab-pane class="card2">
        <span slot="label">
          <el-image class="icon-img"
                    :src="src2"
                    fill="fill"
                    style="height: 14px;width: 14px;"/>
          <span class="tip">个人相册</span></span>
        <div class="title"><p class="title-text">PHOTO GALLERY</p></div>
        <div class="gallery" style="height: 450px;">
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
                    <img v-image-preview class="img" :src="banners[index]"/>
                  </div>
                </div>
              </div>
              <!--            <li v-for="i in count" class="list-item" style="height: 20px">{{ i }}</li>-->
            </ul>
            <p v-if="!noMore" style="color: whitesmoke">加载中……</p>
            <p v-else style="color: whitesmoke">没有更多数据啦(^_^)</p>
          </el-scrollbar>
        </div>
      </el-tab-pane>
    </el-tabs>



    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      :destroy-on-close="true"
      width="30%"
    >
        <div v-if="imageUrl">
          <div class="save-left">
          <el-image fit="cover"
                    :src="'https://weparallelines.top'+imageUrl"
                    :preview-src-list="preview_img"
                    class="upload-image"/>
          <el-button icon="el-icon-close"
                     class="delete-button"
                     v-on:click="deleteImage()"
                     type="info" circle
                     size="mini"/>
          </div>
          <div class="save-right">
            <span class="save-text">这是您的新头像(^-^*)/</span>
          <el-button class="save-btn" type="danger" v-on:click="changeAvatar()">保存修改</el-button>
          </div>
        </div>


        <div v-else class="box-tip">
        <div class="up-img" >
          <el-upload
            class="avatar-uploader"
            action="https://weparallelines.top/api/upload"
            :on-preview="handlePreview"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :http-request="uploadImg">
            <el-image class="icon-img1"
                      :src="src3"
                      fill="fill"/>
            <span class="tip1">上传图片</span>
          </el-upload>
        </div>
        </div>
    </el-dialog>




  </div>
</template>

<script>
import NavBar from '../components/navbar'
import MomentsCard from '../components/MomentsCard'
import {get_my_gallery} from "../api/gallary"
import {identify_result, img_upload} from '../api/identify-result'
// 引入插件
import "@/assets/css/scrollbar.css"
import "@/assets/css/dialog.css"
import {change_avatar, change_nickname, get_status} from "../api/account";
import {get_my_post} from "../api/post";
import storage from "good-storage";
import {Message} from 'element-ui'
export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-moments': MomentsCard
  },
  data() {
    return {
      src : "../static/img/banner.png",
      src1: "../static/img/bell.png",
      src2: "../static/img/camera.png",
      src3: "../static/img/arrow.png",
      infoloaded: false,
      avatarUrl: "",
      nickname: "",
      username: "",
      gallary_cou: 12,
      gallary_page: 1,
      gallary_hasnext: true,
      moments_cou: 4,
      moments: [],
      moments_page: 1,
      moments_loading: false,
      moments_hasnext: true,
      loading: false,
      dialogVisible: false,
      banners: [],
      imageUrl:'',
      preview_img:[],
      changenameVisible: false,
      nametoChange: '',
    }
  },
  computed: {
    displayName(){
      if (this.nickname === '') return this.username
      else return this.nickname
    },
    noMore() {
      //return this.gallary_cou >= 20
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
    moments_noMore () {
      //return this.moments_cou > this.moments.length
      return !this.moments_hasnext;
    },
    moments_disabled(){
      return this.moments_noMore || this.moments_loading
    },
    moments_countData() {  // 计算属性使用切片生成新数组
      let data = [];
      // 大于x条，使用切片，返回新数组
      if (this.moments.length > 4) {
        data = this.moments.slice(0, this.moments_cou);
        return data;
      } else {
        // 否则使用原来数组，不进行切片处理
        data = this.moments
        return data;
      }
    },
    getClientHeight(){
      let Height = document.documentElement.clientHeight - 50;
      let clientHeight = Height + "px"
      console.log("clientHeight 1=="+clientHeight)
      //窗口可视区域发生变化的时候执行
      window.onresize = () => {
        Height = document.documentElement.clientHeight - 50;
        clientHeight = Height + "px"
        console.log("clientHeight changed2=="+clientHeight)
        return clientHeight
      }
      console.log("clientHeight 3=="+clientHeight)
      return clientHeight
    }
  },
  created() {
    this.getUserInfo();
    this.load();
  },
  methods: {
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
    loadMoments () {
      if (!this.moments_noMore){
        this.moments_loading = true;
        get_my_post(this.moments_page).then((response)=>{
          if (response.data.code === 20000){
            //成功
            if (!this.moments_hasnext) return
            this.moments = this.moments.concat(response.data.data.post);
            if (!response.data.data.has_next) this.moments_hasnext = false;
            else {
              this.moments_cou += 4;
              this.moments_page++;
            }
          }
          else {
            this.$message.error('加载失败：'+response.data.msg);
            this.moments_hasnext = false;
          }
        }).catch((error)=>{
          this.$message.error('请求时出错！');
          console.log(error);
        })
        this.moments_loading = false;
      }
    },
    getUserInfo(){
      if(storage.has("user_data")){
        this.nickname = storage.get("user_data").nickname;
        this.username = storage.get("user_data").username;
        this.avatarUrl = storage.get("user_data").avatar;
        this.infoloaded = true;
      }
      else {
        get_status().then((response)=>{
          if (response.data.code === 20000){
            //成功
            if (response.data.data.login){
              this.username = response.data.data.username;
              this.nickname = response.data.data.nickname;
              this.avatarUrl = 'https://weparallelines.top' + response.data.data.avatar;
              this.infoloaded = true;
            }
          }
          else {
            console.log('信息获取失败：'+response.data.msg);
          }
        }).catch((error)=>{
          console.log(error);
        })
      }
    },

    uploadImg (file) {
      let form = new FormData();
      console.log(file.file)
      form.append('img', file.file);
      form.append('usage', 'a');
      img_upload(form).then((res) => {
        console.log(res)
        if (res.data.code === 20000){
          this.imageUrl = res.data.data.path;
          console.log(this.imageUrl)
        }
        else{
          console.log('上传失败：'+res.data.msg);
        }
      }).catch((error) => {
        console.log(error)
      })
    },

    handleAvatarSuccess(res, file) {

    },
    beforeAvatarUpload(file) {
      const isJPG = (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg')
      const isLt5M = file.size / 1024 / 1024 < 5

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG/JPEG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isJPG && isLt5M
    },
    handlePreview (file) {

    },


    deleteImage: function () {
      this.imageUrl = '';
      this.preview_img = [];
    },

    changeAvatar(){
      change_avatar({
        avatar: this.imageUrl,
      }).then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.$message.success('头像修改成功！');
          storage.set("user_data", {
            "avatar": 'https://weparallelines.top' + this.imageUrl,
            "username": this.username,
            "nickname": this.nickname,
          })
          this.dialogVisible = false;
          this.getUserInfo();
        }
        else {
          this.$message.error('头像修改失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    },
    changeNickname(){
      if(typeof this.nametoChange == "undefined" || this.nametoChange.match(/^\s*$/)){
        this.$message.error('无效的昵称！');
        return;
      }
      change_nickname({
        nickname: this.nametoChange
      }).then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.$message.success('昵称修改成功！');
          storage.set("user_data", {
            "avatar": this.avatarUrl,
            "username": this.username,
            "nickname": this.nametoChange,
          })
          this.changenameVisible = false;
          this.getUserInfo();
        }
        else {
          this.$message.error('昵称修改失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    },
  }
}
</script>

<style scoped>
.box-tip{
  /*margin-top: 20px;*/
  border: dashed 3px #e1e1e1;
  height: 160px;
  width: 98%;
  background-color: #fafafa;
}
.up-img{
  height: 35px;
  width: 110px;
  background-color: #ff7e7e;
  border-radius: 3px;
  margin: 0 auto;
  cursor: pointer;
}
.up-img{
  margin-top: 60px;
}
.tip1{
  color: #f7f7f7;
  display: inline-block;
  line-height: 35px;
  vertical-align: middle;
  font-size: 15px;
}
.icon-img1{
  line-height: 35px;
  vertical-align: middle;
  height: 16px;
  width: 16px;
  margin-right: 1px;
}
ul{
  padding-left: 0;
}
.card1-item{
  position: relative;
}
.card1{
  margin-bottom: 50px;
}
.card2{
  width: 580px;
  display: inline-block;
}
.title{
  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
  width: 580px;
  position: relative;
  background-color: #ca917d;
  font-family: 'Algerian';
  font-size: 22px;
  display: table;
  color: #f1eeee;
  height: 100%;
  border-bottom: 1px solid #f1eeee;
}
.title-text{
  vertical-align: center;
  margin-right: 330px;
}
.gallery {
  width: 580px;
  height: 400px;
  margin-bottom: 100px;
  background-color: #ca917d;
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
.card-selector {
  margin-top: 30px;
  position: relative;
  width: 65%;
  display: inline-block;
}

.banner-img {
  width: 76%;
  margin-top: 20px;
}
.avatar-img {
  width:10%;
  position: relative;
  margin: 0 auto;
  border-radius: 50%;
  cursor: pointer;
}
.avatar-img{
  margin-top: -100px;
}
.user-name > span {
  font-size: 28px;
}
.moment-card {
  margin-top: 20px;
}

.tip{
  display: inline-block;
  vertical-align: middle;
}
.icon-img{
  vertical-align: middle;
  height: 16px;
  width: 16px;
  margin-right: 5px;
}
.user-name{
  margin-bottom: 20px;
}
.save-left{
  /*margin-left: 15px;*/
  /*margin-top: 20px;*/
  margin: 0 auto;
  /*float: left;*/
  position: relative;
  background-color: #5daf34;
  width: 160px;
  height: 160px;
  border-radius: 3px;
}
.upload-image {
  width: 160px;
  height: 160px;
  border-radius: 3px;
}
.delete-button {
  position: absolute;
  right:0;
  top: 0;
  opacity: 0.7;
}
.save-right{
  margin: 10px auto 0;
  /*float: left;*/
  width: 200px;
  position: relative;
  text-align: center;
  justify-content: center;
}
.save-text{
  font-size: 15px;
  color: #aaa8a8;
  display: block;
}
.save-btn{
 margin-top: 20px;
}
.name-btn{
  position: absolute;
  display: inline;
  padding: 0;
  top: 30%;
  left: 105%;
  color: #909399;
}
.change_name{
  min-height: auto;
  height: auto;
}
</style>
