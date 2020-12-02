<template>
  <div id="app">
    <div style="min-height:75%; padding-bottom:50px;">
      <router-view/>
    </div>
    <ibird-footer/>
  </div>
</template>

<script>
import IbirdFooter from "./components/footer";
export default {
  name: 'App',
  components: {IbirdFooter}
}
</script>

<style>
body{
  margin: 0;
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
