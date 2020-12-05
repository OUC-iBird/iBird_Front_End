<template>
  <div>
    <ibird-nav />
    <div class="map-container">
      <baidu-map class="map" center="北京" :style="{'height': getClientHeight}">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
<!--        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>-->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>

        <bm-marker :position="positions[1]" :dragging="false" @click="expandWindows(1)">
        </bm-marker>

        <bm-marker :position="positions[2]" :dragging="false" @click="expandWindows(2)">
        </bm-marker>

        <bm-info-window :position="info_position" :show="show" @close="closeWindows(1)">{{ information[1] }}</bm-info-window>
      </baidu-map>
    </div>
  </div>

</template>

<script>
import NavBar from '../components/navbar'
export default {
  name: "Map",
  components: {
    'ibird-nav': NavBar,
  },
  data(){
    return {
      info_position: {
        lng: 116.404, lat: 39.995
      },
      show: false,
      numbers: 5,
      positions: [
        {lng: 116.404, lat: 39.915},
        {lng: 116.404, lat: 39.995},
        {lng: 116.404, lat: 39.915},
        {lng: 115.404, lat: 39.915},
        {lng: 117.404, lat: 39.915}
      ],
      information: [
        "这个是个测试",
        "这个是个测试",
        "这个是个测试",
        "这个是个测试",
        "这个是个测试",
      ]
    }
  },
  methods: {
    // draw ({el, BMap, map}) {
    //   const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
    //   el.style.left = pixel.x - 60 + 'px'
    //   el.style.top = pixel.y - 20 + 'px'
    // },
    expandWindows(i){
      console.log(this.show);
      this.info_position = {
        lng: this.positions[i].lng-0.003,
        lat: this.positions[i].lat+0.005,
      }
      this.show = true;
    },
    closeWindows(){
      this.show = false;
    }
  },
  computed: {
    getClientHeight: function (){
      let Height = document.documentElement.clientHeight - 90;
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

.map-container {
  margin-top: 10px;
  min-height: 400px;
  display: inline-block;
  width: 100%;
}

.map {
  display: block;
  margin: 0 auto;
  width: 95%;
}
</style>
