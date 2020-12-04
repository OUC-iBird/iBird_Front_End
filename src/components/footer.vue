<template>
  <div class="footer" :style="{'position': pos}">
    <a class="fotter-a" href="https://beian.miit.gov.cn" target="_blank">鲁ICP备2020045573号-1</a>
    <span class="fotter-text">@ITStudio 2002-2020 All Right Reserved</span>
    <span class="fotter-source">
      <a target="_blank" href="https://icons8.com/icons/set/top-view-bird">Top View Bird icon</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
    </span>
  </div>
</template>

<script>
export default {
  name: "Footer",
  props: {
    pos: {
      type: String,
      default: "absolute"
    }
  },
  computed: {
    getClientHeight: function () {
      let ratio = 0,
        screen = window.screen,
        ua = navigator.userAgent.toLowerCase();

      if (window.devicePixelRatio !== undefined) {
        ratio = window.devicePixelRatio;
      }
      else if (~ua.indexOf('msie')) {
        if (screen.deviceXDPI && screen.logicalXDPI) {
          ratio = screen.deviceXDPI / screen.logicalXDPI;
        }
      }
      else if (window.outerWidth !== undefined && window.innerWidth !== undefined) {
        ratio = window.outerWidth / window.innerWidth;
      }

      if (ratio) {
        ratio = Math.round(ratio * 100);
      }
      let Height = document.documentElement.clientHeight*ratio/100;
      let clientHeight = Height + "px"
      console.log("clientHeight 1=="+clientHeight)
      //窗口可视区域发生变化的时候执行
      window.onresize = () => {
        clientHeight = Height + "px"
        console.log("clientHeight changed2=="+clientHeight)
        return clientHeight
      }
      console.log("clientHeight 3=="+clientHeight)
      return clientHeight
    }
  }
}
</script>

<style scoped>
.footer {
  margin-top: 140px;
  background: #5e5d5d;
  color: #bfbfbf;
  width: 100%;
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

.fotter-source{
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
