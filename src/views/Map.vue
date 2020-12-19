<template>
  <div>
    <ibird-nav />
    <div class="map-container">
      <baidu-map class="map"
                 :center="center"
                 :zoom="zoom"
                 :scroll-wheel-zoom="true"
                 @ready="handler"
                 :style="{'height': getClientHeight}">
        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
<!--        <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>-->
        <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        <div v-if="readytodisplay" v-for="(i,index) in numbers">
          <bm-marker :position="positions[index]" :dragging="false" @click="expandWindows(index)">
          </bm-marker>
        </div>
        <bm-info-window :position="info_position" :show="show" @close="closeWindows()">
          <div>{{ info_moment }}</div><br/>
          <div><i class="el-icon-location-information"/><i>{{ info_address }}</i></div>
        </bm-info-window>
      </baidu-map>
    </div>
  </div>

</template>

<script>
import NavBar from '../components/navbar'
import {get_points} from "../api/post";
export default {
  name: "Map",
  components: {
    'ibird-nav': NavBar,
  },
  data(){
    return {
      center: '青岛',
      zoom: 13,
      info_position: {
        lng: 116.404, lat: 39.995
      },
      info_moment:'',
      info_address:'',
      show: false,
      numbers: 0,
      information: [],
      positions: [],
      readytodisplay:false,
    }
  },
  methods: {
    // draw ({el, BMap, map}) {
    //   const pixel = map.pointToOverlayPixel(new BMap.Point(116.404, 39.915))
    //   el.style.left = pixel.x - 60 + 'px'
    //   el.style.top = pixel.y - 20 + 'px'
    // },
    handler ({BMap, map}) {
      this.getPositions();
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
          if(this.getStatus() === BMAP_STATUS_SUCCESS){
            map.panTo(r.point);
          }
          else {
            this.$message.error('failed'+this.getStatus());
          }
      })
    },
    expandWindows(i){
      console.log(this.show);
      this.info_position = {
        lng: this.positions[i].lng-0.003,
        lat: this.positions[i].lat+0.005,
      }
      this.info_moment=this.information[i].content;
      this.info_address=this.information[i].address;
      this.show = true;
    },
    closeWindows(){
      this.show = false;
    },
    getPositions(){
      get_points().then((response)=>{
        if (response.data.code === 20000){
          //成功
          this.numbers += response.data.data.count;
          var convertor = new BMap.Convertor(); //坐标转换
          var pointArr = [];
          for (let i = 0; i < response.data.data.count; i++) {
            this.information.push({content:response.data.data.point[i].content, address:response.data.data.point[i].address});
            //this.positions.push({lng:response.data.data.point[i].longitude, lat:response.data.data.point[i].latitude});
            pointArr.push(new BMap.Point(response.data.data.point[i].longitude,response.data.data.point[i].latitude));
            if (pointArr.length === 10){ //坐标转换一次最多10个点
              convertor.translate(pointArr, 1, 5, this.translateCallback);
              pointArr = [];
            }
          }
          if (pointArr.length > 0) convertor.translate(pointArr, 1, 5, this.translateCallback);
        }
        else {
          this.$message.error('获取失败：'+response.data.msg);
        }
      }).catch((error)=>{
        this.$message.error('请求时出错！');
        console.log(error);
      })
    },
    //坐标转换完之后的回调函数
    translateCallback(data){
      console.log(data)
      if(data.status === 0) {
        this.positions = this.positions.concat(data.points);
        if(this.positions.length >= this.numbers) this.readytodisplay=true;
      }
    },
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
