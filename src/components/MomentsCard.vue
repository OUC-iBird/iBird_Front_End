<template>
<el-container class="card-border">

  <el-header class="user-msg">
    <el-avatar :size="50" :src="avatar"></el-avatar>
    <span class="span-name">{{username}}</span><br>
    <span class="span-time">{{ptime}}</span>
    <div v-if="location_visible" class="location">
      <i class="el-icon-location-information"></i>
      <i>{{location}}</i>
    </div>
  </el-header>
  <el-main class="record-text">{{moment}}</el-main>
  <el-footer height="150px">
    <el-image
      style="width: 200px; height: 150px"
      fit="contain"
      class="record-img"
      :src="thumbnail_img"
      :preview-src-list="preview_img">
    </el-image>
    <div v-if="thumb.thumb_visible" class="thumb">
      <i @click="handleThumbup" v-bind:class="icon_class"></i>
      <span>{{thumb.thumb_num}}</span>
    </div>
  </el-footer>



</el-container>
</template>

<script>
// 个人动态的组件
export default {
  name: 'MomentsCard',
  data() {
    return {
      icon_class:{
        "iconfont": true,
        "icon-like-fill" : true,
        "icon-like": false,
      }
    }
  },
  methods:{
    handleThumbup(){
      if(this.thumb.thumb_status){
        this.thumb.thumb_status = false;
        this.icon_class['icon-like'] = true;
        this.icon_class['icon-like-fill'] = false;
      }
      else{
        this.thumb.thumb_status = true;
        this.icon_class['icon-like'] = false;
        this.icon_class['icon-like-fill'] = true;
      }

      console.log("点赞");
    },
    handleCancelThumbup(){
      this.thumb.thumb_status = false;

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
      default: "../static/img/avatar_default",
    },
    ptime: {
      type: String,
      default: "1分钟前",
    },
    thumbnail_img: {
      type: String,
      default: "../static/img/moments_test.jpg",
    },
    preview_img: {
      type: Array,
      default: () => {
        return ["../static/img/moments_test.jpg"]
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
    location_visible: {
      type: Boolean,
      default: true
    },
    thumb: {
      type: Object,
      default: ()=>{
        return {
          thumb_num: 0,
          thumb_visible: true,
          thumb_status: true,
        }
      }
    }
  },
  mounted () {
    if (this.thumb.thumb_status){

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


.card-border {
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  width: 80%;
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
  font-size: 20px;
  margin-left: 10px;
}
.user-msg .span-time {
  position: relative;
  color:#8c939d;
  margin-left: 10px;
  top: 4px;
  font-size: 10px;

}
.record-text {
  padding-bottom: 0;
}
.record-img {
}

.location {
  margin-top: -20px;
  float: right;
}
.thumb{
  float: right;
  top: 70%;
  position: relative;
}
.thumb > span{
  font-size: 24px;
}


</style>
