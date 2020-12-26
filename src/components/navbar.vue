<template>
<el-menu
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  text-color="#000"
  router
  :default-active="this.$router.path"
  active-text-color="#ffd04b">
  <el-menu-item index="/home" route="home">
      <el-image :src="logo"
      style="width: 120px; height: 50px"></el-image>
  </el-menu-item>
  <el-submenu index="2" style="float:right" >
      <template slot="title">
        <el-avatar :size="40" :src="avatar" fit="contain" @error="errorHandler">
        </el-avatar>
      </template>
    <div v-if="login"  class="login-style" >
      <div style="display: block">
        <el-menu-item id="tid" index="/center" class="submenu" route="center">
          <el-image class="icon"
                    :src="icon1"
                    fill="fill"
                    style="height: 15px;width: 15px;">
          </el-image>个人中心</el-menu-item></div>
      <div style="display: block">
        <el-menu-item index="/publish" class="submenu" route="publish">
          <el-image class="icon"
                    :src="icon2"
                    fill="fill"
                    style="height: 15px;width: 15px;">
          </el-image>发布动态</el-menu-item></div>
      <div style="display: block" >
        <el-menu-item class="submenu" @click="logout()">
          <el-image class="icon"
                    :src="icon3"
                    fill="fill"
                    style="height: 15px;width: 15px;">
          </el-image>退出登录</el-menu-item></div>
    </div>
    <div v-else class="login-style">
      <div style="display: block">
        <el-menu-item index="/login" class="submenu" route="login">
          <el-image class="icon"
                    :src="icon4"
                    fill="fill"
                    style="height: 14px;width: 14px;">
          </el-image>登录</el-menu-item></div>
      <div style="display: block">
        <el-menu-item index="/register" class="submenu" route="register">
          <el-image class="icon"
                    :src="icon5"
                    fill="fill"
                    style="height: 14px;width: 14px;">
          </el-image>注册</el-menu-item></div>
    </div>
  </el-submenu>
  <el-menu-item index="3" style="float:right; border-bottom: 0" route="publish">
      <span class="RedTextColor">+   发布</span>
  </el-menu-item>
  <el-menu-item index="/map" style="float:right" route="map">MAP</el-menu-item>
  <el-menu-item index="/moments" style="float:right" route="moments">动态</el-menu-item>
  <el-menu-item index="/identify" style="float:right" route="identify">识别</el-menu-item>
  <el-menu-item index="/home" style="float: right" route="home">主页</el-menu-item>

</el-menu>
</template>


<script>
// 修改导航栏弹出框样式
import "@/assets/css/el-menu.css"
import {get_status, logout} from "../api/account";
import storage from 'good-storage'

export default {
  name: "ibird-nav",

  data() {
    return {
      activeIndex: "/home",
      logo: "../static/img/logo.png",
      username: '',
      nickname: '',
      avatar: '',
      defaultAvatar: '../static/img/avatar_default.png',
      login: storage.has("login"),
      icon1: "../static/img/person.png",
      icon2: "../static/img/sent.png",
      icon3: "../static/img/login-out.png",
      icon4: "../static/img/login.png",
      icon5: "../static/img/regist.png",
    };
  },
  mounted() {
    // ????这里的跳转检查被 foreach 取代
    // console.log("Checked by the navbar");
    if(storage.has("login")){
      this.login = true;
      if(storage.has("user_data")){
        this.nickname = storage.get("user_data").nickname;
        this.username = storage.get("user_data").username;
        this.avatar = storage.get("user_data").avatar;
      }
      else {
        this.getStatus();
      }
    }
    else{
      this.login = false;
      if(this.$route.meta.requireAuth){
        // 检查本地的 session 缓存
        this.$router.push({path: "/login"})
      }
    }
  },

  methods: {
    handleSelect(key, keyPath) {
    },
    errorHandler() {
      this.avatar = this.defaultAvatar;
      return true;
    },
    logout(){
      logout().then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.login = false;
          // 清空本地缓存
          storage.clear();
          this.$message.success('注销成功！');
          this.$router.push({path: "/login"})
        }
        else {
          this.$message.error('注销失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    },
    getStatus(){
      get_status().then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.login = response.data.data.login;
          if (response.data.data.login){
            this.username = response.data.data.username;
            this.nickname = response.data.data.nickname;
            this.avatar = 'https://weparallelines.top'+response.data.data.avatar;
            storage.set("user_data", {
              "avatar": this.avatar,
              "username": this.username,
              "nickname": this.nickname,
            })
          }
          else {
            this.username = '';
            this.nickname = '';
            this.avatar = this.defaultAvatar;
            storage.clear();
          }
        }
        else {
          console.log('信息获取失败：'+response.data.msg);
        }
      }).catch((error)=>{
        console.log(error);
      })
    },
  }
}
</script>

<style scoped>
.RedTextColor {
    background-color:rgb(255, 126, 126) !important;
    color: #ffffff;
    font-size: 18px;
    text-transform: uppercase;
    padding: 9px 19px;
    border-radius: 30px;
    height: 18px;
}
.icon{
  margin-right: 8px;
}
.login-style{
  text-align: center;
}

</style>
