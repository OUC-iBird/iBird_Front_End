<template>
<el-container class="card-border">

  <el-header class="user-msg">
    <el-avatar :size="50" :src="avatar"></el-avatar>
    <span class="span-name">{{username}}</span><br>
    <span class="span-time">{{ptime}}</span>
  </el-header>
  <el-main class="record-text">{{moment}}</el-main>
  <el-image
      style="width: 200px; height: 150px"
      fit="contain"
      class="record-img"
      :src="thumbnail_img"
      :preview-src-list="preview_img">
  </el-image>


</el-container>
</template>

<script>
// 个人动态的组件
export default {
  name: 'MomentsCard',
  data() {
    return {
      username: "Ctwo",
      avatar: "../static/img/avatar_default",
      ptime: "1分钟前",
      thumbnail_img: "../static/img/moments_test.jpg",
      preview_img: "../static/img/moments_test.jpg",
      moment: "前端好难啊啊啊啊啊啊啊啊啊...",
    }
  }
}
</script>

<style scoped>
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
  padding-left: 20px;
}
</style>
