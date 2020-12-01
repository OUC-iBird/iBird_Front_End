<template>
  <el-container class="footer">
    <el-footer height="240px">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="fotter-col">
            <strong>APP下载</strong>
            <p>扫描下载iBrid手机客户端</p>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="fotter-col">
            <strong>关于我们</strong>
            <p>关于我们</p>
            <a href="https://beian.miit.gov.cn" target="_blank">鲁ICP备2020045573号-1</a>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="fotter-col">
            <strong>联系我们</strong>
            <p>点击下方联系我们</p>
          </div>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
export default {
  name: "ibird-footer"
}
</script>

<style scoped>
.footer {
  background: #555555;
  color: #bfbfbf;
  font-size: 1.2em;
  text-align: left;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 10%;
  width: 100%;
}

strong {
  font-size: 2em;
  color: #e7e7e7;
}

.fotter-col {
  padding-left: 5%;

}

a {
  text-decoration: none;
  color: #bfbfbf;
}
</style>
