<template>
  <div class="content">
    <ibird-nav />
    <div class="top">
      <div class="left">
        <div class="swiper-container">
        <swiper :options="swiperOption" ref="mySwiper">
          <swiper-slide><img :src="img1"  style="width: 100%; height: auto;" /></swiper-slide>
          <swiper-slide><img :src="img2"  style="width: 100%; height: auto;" /></swiper-slide>
          <swiper-slide><img :src="img3"  style="width: 100%; height: auto;"  /></swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
       </swiper>
      </div>
      </div>

      <div class="right">
        <el-image class="phone-img"
                  :src="src2"
                  fill="fill"
        >
        </el-image>
        <span class="label1">下载iBird APP</span>
        <span class="label2">海量鸟类，一键识别</span>
        <el-button type="danger" round v-on:click="popBox" >立即下载</el-button>
      </div>
    </div>

    <div class="box">
      <div class="xuxian1"></div>
      <div class="text">热门动态</div>
      <div class="xuxian2"></div>
    </div>


    <div class="infinite-list-wrapper">
      <el-row :span="24" v-for="(i, index) in moments" v-if="index % 2 === 0" :key="index">
        <el-col :span="9" :offset="2">
          <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                         class="moment-card"
                         v-bind:username=moments[index].username
                         v-bind:moment=moments[index].content
                         v-bind:thumbnail_img=moments[index].path
                         v-bind:avatar=moments[index].avatar
                         v-bind:ptime=moments[index].create_time
                         v-bind:pid=moments[index].post_id
                         v-bind:location=moments[index].address
                         v-bind:thumb=
                           {thumb_num:moments[index].like,thumb_visible:true,thumb_status:moments[index].is_liked|false,}
          />
        </el-col>
        <el-col :span="9" :offset="0" :push="2" v-if="index+1<moments.length">
          <ibird-moments style="box-shadow: none; border: 0.1px solid #e0e0e0;"
                         class="moment-card"
                         v-bind:username=moments[index+1].username
                         v-bind:moment=moments[index+1].content
                         v-bind:thumbnail_img=moments[index+1].path
                         v-bind:avatar=moments[index+1].avatar
                         v-bind:ptime=moments[index+1].create_time
                         v-bind:pid=moments[index+1].post_id
                         v-bind:location=moments[index+1].address
                         v-bind:thumb=
                           {thumb_num:moments[index+1].like,thumb_visible:true,thumb_status:moments[index+1].is_liked|false,}
          />
        </el-col>
      </el-row>
      <button @click="toAllPosts" class="load-button" >查看全部</button>
    </div>
    <ibird-footer pos="relative"/>
    <!-- 弹出框 -->
    <div id="popLayer"></div>
    <div id="popBox">
      <div class="close">
        <el-button  icon="el-icon-close" v-on:click="closeBox" style="border: none;"></el-button>
      </div>
      <div class="content1">
        <div class="tip">扫描二维码，下载安卓APP吧</div>
        <img class="icon" alt="" :src="src3">
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import MomentsCard from '../components/MomentsCard'
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import {get_hot_post} from "../api/post";

export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-footer': Footer,
    'ibird-moments': MomentsCard,
    swiper,
    swiperSlide
  },
  data() {
    return {
      img1 : "../static/img/img2.jpg",
      img2 : "../static/img/img1.jpg",
      img3 : "../static/img/img3.jpg",
      src2 : "../static/img/phone.png",
      src3 : "../static/img/icon.png",
      moments: [],
      loading: false,
      // 默认显示条数
      cou: 4,
      swiperOption: {
        loop: true,
        slidesPerView: 1,//数量
        slidesPerGroup: 1,//分几组
        direction : 'horizontal',//设置水平还是垂直vertical
        //不需要自动轮播时
        //autoplay: false,
        autoplay: {
          delay: 3000,//延迟时长
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 显示分页
        pagination: {
          el: ".swiper-pagination",
          clickable: true //允许分页点击跳转
        },
        // 设置点击箭头
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }
      }
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
    get_hot_post().then((response)=>{
      if (response.data.code === 20000){
        //成功
        this.moments = this.moments.concat(response.data.data.post);
      }
      else {
        this.$message.error('加载失败：'+response.data.msg);
      }
    }).catch((error)=>{
      this.$message.error('请求时出错！');
      console.log(error);
    })
  },
  methods:{
    /*点击弹出按钮*/
    popBox: function() {
      var popBox = document.getElementById("popBox");
      var popLayer = document.getElementById("popLayer");
      popBox.style.display = "block";
      popLayer.style.display = "block";
    },
    /*点击关闭按钮*/
    closeBox: function() {
      var popBox = document.getElementById("popBox");
      var popLayer = document.getElementById("popLayer");
      popBox.style.display = "none";
      popLayer.style.display = "none";
    },
    toAllPosts(){
      this.$router.push({
        path: '/moments'
      })
    }
  }
};
</script>
<style scoped >
.infinite-list-wrapper{
  margin-top: 20px;
  width: 100%;
}
.moment-card {
  margin-bottom: 15px;
}
.top{
  width: 100%;
  margin-top: 25px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.swiper-container{
  height: 380px;
  --swiper-pagination-color: #f56c6c;/* 分页器颜色 */
  --swiper-navigation-color: #fefefe; /* 左右按钮颜色 */
  --swiper-navigation-size: 20px; /* 左右按钮大小 */
}
.left,.right{
  float: left;
  height: 380px;
}
.left{
  width: 700px;
  border: 1px solid #e0e0e0;
}
.right{
  width: 240px;
  border: 1px solid #e0e0e0;
}
.phone-img{
  display: inline-block;
  height: auto;
  max-width: 38%;
  margin-top: 50px;
  margin-bottom: 20px;
}
.label1{
  display: block;
  margin-bottom: 20px;
  color: #000000;
  font-family: 'Adobe 黑体 Std';
  font-size: 15px;
}
.label2{
  display: block;
  margin-bottom:20px;
  color: #3b3939;
  font-size: 13px;
  font-family: 'Adobe 黑体 Std';

}
.swiper-container .swiper-button-prev, .swiper-button-next{
  display: none;
  background-color:  rgba(36, 33, 33, 0.6);
  width: 35px;
  height: 46px;
  vertical-align: middle;
  line-height: 46px;
}
.swiper-container:hover .swiper-button-prev{
  display: block;
  border-radius: 0px 10px 10px 0px;
  left: 0!important;
}
.swiper-container:hover .swiper-button-next{
  display: block;
  border-radius: 10px 0px 0px 10px;
  right: 0!important;
}
/*中间过渡线*/
.box{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.xuxian1{
  margin-top: 30px;
  height: 1px;
  width: 40%;
  border-top: 1px dashed #aaa8a8;
  float: left;
}
.text{
  margin-right: 50px;
  margin-left: 50px;
  color: black;
  float: left;
  font-size: 21px;
  margin-top: 18px;
}
.xuxian2{
  float: right;
  margin-top: 30px;
  height: 1px;
  width: 40%;
  border-top: 1px dashed #aaa8a8;
}


/*弹出框*/
/*背景层*/
#popLayer {
  display: none;
  background-color: #a7a4ac;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  -moz-opacity: 0.8;
  opacity:.80;
  filter: alpha(opacity=50);
}
/*弹出层*/
#popBox {
  display: none;
  background-color: #FFFFFF;
  z-index: 11;
  width: 300px;
  height: 330px;
  position:fixed;
  top:0;
  right:0;
  left:0;
  bottom:0;
  margin:auto;
}
#popBox .close{
  text-align: right;
}
/*关闭按钮*/
.tip{
  font-size: 16px;
}
.icon{
  margin-top: 15px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  height: 200px;
  width: 200px;
}


.load-button{
  color: #ff99b6;
  background-color: transparent;
  border: 0.1px solid #ff99b6;
  height: 35px;
  width: 400px;
  font-size: 12px;
  margin-top:30px;
  margin-bottom: 50px;
  outline: none;
  cursor: pointer
}
</style>
