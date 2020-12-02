<template>
  <div class="footer">
      <a class="fotter-a" href="https://beian.miit.gov.cn" target="_blank">鲁ICP备2020045573号-1</a>
      <span class="fotter-text">@ITStudio 2002-2020 All Right Reserved</span>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped>
.footer {
  margin-top: 20px;
  background: #555555;
  color: #bfbfbf;
  width: 100%;
  /*position: relative;*/
  bottom: 0;
  height: 40px;
}


.fotter-a{
  line-height: 20px;
  margin-top: 10px;
  float: right;
  padding-right: 20px;
}

.fotter-text {
  line-height: 20px;
  margin-top: 10px;
  padding-right: 20px;
  float: right;
}

a {
  text-decoration: none;
  color: #bfbfbf;
}
</style>
