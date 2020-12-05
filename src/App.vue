<template>
  <div id="app">
    <ibird-nav/>
    <router-view/>
  </div>
</template>

<script>
import IbirdNav from "./components/navbar";
export default {
  name: 'App',
  components: {IbirdNav},
}
</script>

<style>
body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /*color: #2c3e50;*/
  /*margin-top: 20px;*/
  height: 100%;
}
</style>
