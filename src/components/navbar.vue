<template>
<el-menu
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  text-color="#000"
  router
  active-text-color="#ffd04b">
  <el-menu-item index="1" route="home">
      <el-image :src="logo"
      style="width: 120px; height: 50px"></el-image>
  </el-menu-item>
  <el-submenu index="2" style="float:right" >
      <template slot="title">
        <el-avatar :size="40" :src=defaultAvatar fit="contain" @error="errorHandler">
        </el-avatar>
      </template>
    <div v-if="login"  class="login-style" >
      <div style="display: block">
        <el-menu-item id="tid" index="2-1" class="submenu" route="center">
          <el-image class="icon"
                    :src="icon1"
                    fill="fill"
                    style="height: 15px;width: 15px;">
          </el-image>个人中心</el-menu-item></div>
      <div style="display: block">
        <el-menu-item index="2-2" class="submenu" route="publish">
          <el-image class="icon"
                    :src="icon2"
                    fill="fill"
                    style="height: 15px;width: 15px;">
          </el-image>发布动态</el-menu-item></div>
      <!--      待补充逻辑-->
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
        <el-menu-item index="2-3" class="submenu" route="login">
          <el-image class="icon"
                    :src="icon4"
                    fill="fill"
                    style="height: 14px;width: 14px;">
          </el-image>登录</el-menu-item></div>
      <div style="display: block">
        <el-menu-item index="2-4" class="submenu" route="register">
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
  <el-menu-item index="4" style="float:right" route="map">MAP</el-menu-item>
  <el-menu-item index="5" style="float:right" route="moments">动态</el-menu-item>
  <el-menu-item index="6" style="float:right" route="identify">识别</el-menu-item>

</el-menu>
</template>


<script>
// 修改导航栏弹出框样式
import "@/assets/css/el-menu.css"
import {get_status, logout} from "../api/account";

export default {
  name: "ibird-nav",
  // props: {
  //     activeIndex2: '1',
  //     logo: "../static/img/logo.png"
  // },
  data() {
    return {
      activeIndex2: '1',
      logo: "../static/img/logo.png",
      username: '',
      nickname: '',
      avatar: '',
      defaultAvatar: '../static/img/avatar_default.png',
      login: false,
      icon1: "../static/img/person.png",
      icon2: "../static/img/sent.png",
      icon3: "../static/img/login-out.png",
      icon4: "../static/img/login.png",
      icon5: "../static/img/regist.png",
    };
  },
  mounted() {
    this.getStatus();
  },
  methods: {
    handleSelect(key, keyPath) {
      if(key === 3){
      }
      console.log(key, keyPath);
    },
    errorHandler() {
      return true;
    },
    logout(){
      logout().then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.login = false;
          this.$message.success('注销成功！');
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
            this.avatar = response.data.data.avatar;
          }
          else {
            this.username = '';
            this.nickname = '';
            this.avatar = this.defaultAvatar;
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
