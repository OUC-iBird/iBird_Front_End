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
  <el-submenu index="2" style="float:right">
      <template slot="title">
        <el-avatar :size="40" :src=defaultAvatar fit="contain" @error="errorHandler">
        </el-avatar>
      </template>
    <div v-if="login">
      <el-menu-item index="2-1" class="submenu" route="center">个人中心</el-menu-item>
      <el-menu-item index="2-2" class="submenu" route="publish">发布动态</el-menu-item>
      <!--      待补充逻辑-->
      <el-menu-item class="submenu" @click="logout()">注销</el-menu-item>
    </div>
    <div v-else>
      <el-menu-item index="2-3" class="submenu" route="login">登录</el-menu-item>
      <el-menu-item index="2-4" class="submenu" route="register">注册</el-menu-item>
    </div>
  </el-submenu>
  <el-menu-item index="3" style="float:right" route="publish">
      <span class="RedTextColor">+   发布</span>
  </el-menu-item>
  <el-menu-item index="4" style="float:right" route="map">MAP</el-menu-item>
  <el-menu-item index="5" style="float:right" route="moments">动态</el-menu-item>
  <el-menu-item index="6" style="float:right" route="identify">识别</el-menu-item>

</el-menu>
</template>


<script>
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
        avatar: '',
        defaultAvatar: '../static/img/avatar_default.png',
        login: true,
      };
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
        this.$message({
          message: '没做，下次一定',
          type: 'warning'
        });
      }
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

.submenu {
  text-align: center;
  display: block;
}

.el-munu--popup {
  width: 100px;
}

</style>
