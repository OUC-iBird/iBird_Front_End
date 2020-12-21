<template>
<el-container class="card-border">

  <el-header class="user-msg">
    <el-avatar :size="44" :src="display_avatar"></el-avatar>
    <span class="span-name">{{username}}</span><br>
    <span class="span-time">{{display_time}}</span>
    <div v-if="location_visible" class="location">
      <i class="el-icon-location-information"></i>
      <i>{{location}}</i>
    </div>
  </el-header>
  <div class="record-text">{{moment}}</div>
  <el-footer height="170px">
    <el-image
      style="width: 165px; height: 165px"
      class="record-img"
      :src="display_img"
      :preview-src-list="preview_img">
    </el-image>
    <div v-if="thumb.thumb_visible" class="thumb" v-bind:class="{'thumbup':icon_class['icon-like-fill']}">
      <i @click="handleThumbup" v-bind:class="icon_class"></i>
      <span>{{num}}</span>
    </div>
  </el-footer>



</el-container>
</template>

<script>
// 个人动态的组件
import {like_post} from "../api/post";
import moment from "moment";

export default {
  name: 'MomentsCard',
  data() {
    return {
      icon_class:{
        "iconfont": true,
        "icon-like-fill" : false,
        "icon-like": true,
      },
      display_time : '',
      display_avatar: '',
      num: this.thumb.thumb_num,
      display_img: '',
    }
  },
  methods:{
    handleThumbup(){
      if(!this.thumb.thumb_status){
        like_post({
          post_id: this.pid,
        }).then((response)=>{
          if (response.data.code === 20000){
            //成功
            this.thumb.thumb_status = true;
            this.icon_class['icon-like'] = false;
            this.icon_class['icon-like-fill'] = true;
            this.num++;
            this.$message.success('点赞成功！');
          }
          else {
            this.$message.error('点赞失败：'+response.data.msg);
          }
        }).catch((error)=>{
          this.$message.error('请求时出错！');
          console.log(error);
        })
      }
      else this.$message.error('此动态已点赞!')
    },
    handleCancelThumbup(){
      this.thumb.thumb_status = false;
      this.icon_class['icon-like'] = true;
      this.icon_class['icon-like-fill'] = false;
      console.log("取消点赞");
    }
  },
  props: {
    username: {
      type: String,
      default: "Ctwo"
    },
    avatar: {
      type: String,
      default: "",
    },
    ptime: {
      type: String,
      default: "2020-12-10 11:49:01",
    },
    pid: {
      type: Number,
      default: 2333,
    },
    thumbnail_img: {
      type: String,
      default: "",
    },
    preview_img: {
      type: Array,
      default: () => {
        return []
      }
    },
    moment: {
      type: String,
      default: "前端好难啊啊啊啊啊啊啊啊啊..."
    },
    location: {
      type: String,
      default: "青岛-崂山区"
    },
    thumb: {
      type: Object,
      default: ()=>{
        return {
          thumb_num: 0,
          thumb_visible: true,
          thumb_status: false,
        }
      }
    }
  },
  created () {
    if (this.thumb.thumb_status){
      this.icon_class['icon-like'] = false;
      this.icon_class['icon-like-fill'] = true;
    }
    this.display_time = moment(this.ptime).fromNow();
    this.display_avatar = 'https://weparallelines.top/' + this.avatar
    this.display_img = 'https://weparallelines.top' + this.thumbnail_img
    this.preview_img.push(this.display_img)
  },
  computed: {
    location_visible(){
      return this.location !== '';
    }
  }
}
</script>

<style scoped>

@import "//at.alicdn.com/t/font_2033785_bfjbg96cpjm.css";

.iconfont{
  font-family:"iconfont" !important;
  font-size:30px;font-style:normal;
  -webkit-font-smoothing: antialiased;
  -webkit-text-stroke-width: 0.2px;
  -moz-osx-font-smoothing: grayscale;
  cursor: pointer;
}
ul{
  padding-left: 0;
}
.card-border {
  box-shadow: none;
  border: 0.1px solid #e0e0e0;
  width: 82%;
  text-align: left;
}
.card-border .user-msg{
  margin-top: 15px;
  position: relative;
  float: left;
}

.user-msg .el-avatar {
  float: left;
}

.user-msg .span-name {
  position: relative;
  font-size: 16px;
  margin-left: 10px;
  font-family: '宋体', serif;
  color: #444444;
  font-weight: bold;
  top: 3px;
}
.user-msg .span-time {
  position: relative;
  color:#8c939d;
  margin-left: 10px;
  top: 3px;
  font-size: 12px;
}
.record-text {
  margin-left: 25px;
  margin-right: 25px;
  font-size: 12px;
  color: #444444;
  margin-bottom: 10px;
  word-wrap: break-word;
}
.el-footer{
  margin-bottom: 18px;
}
.record-img {
  border-radius: 10px;
}
.location {
  margin-top: -20px;
  float: right;
}
.thumb{
  float: right;
  top: 85%;
  position: relative;
  color: #898989;
}
.thumb > span{
  font-size: 24px;
}
.thumbup{
  color: #fd8282;
}

</style>
