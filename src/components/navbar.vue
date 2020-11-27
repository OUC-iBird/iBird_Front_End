<template>
<el-menu
  class="el-menu-demo"
  mode="horizontal"
  @select="handleSelect"
  text-color="#000"
  active-text-color="#ffd04b">
  <el-menu-item index="1">
      <el-image :src="logo"
      style="width: 120px; height: 50px"></el-image>
  </el-menu-item>
  <el-menu-item index="2" style="float:right">
      <el-avatar :size="40" src="../static/img/avatar_default.png" @error="errorHandler">
      </el-avatar>
  </el-menu-item>
  <el-menu-item index="3" style="float:right">
      <span class="RedTextColor">+   发布</span>
  </el-menu-item>
  <el-menu-item index="4" style="float:right">MAP</el-menu-item>
  <el-menu-item index="5" style="float:right">动态</el-menu-item>
  <el-menu-item index="6" style="float:right">识别</el-menu-item>
  
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
        logo: "../static/img/logo.png"
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
      }
    }
  }
</script>

<style>
.RedTextColor {
    background-color:rgb(255, 126, 126) !important;
    color: #ffffff;
    font-size: 18px;
    text-transform: uppercase;
    padding: 9px 19px;
    border-radius: 30px;
    height: 18px;
}
</style>