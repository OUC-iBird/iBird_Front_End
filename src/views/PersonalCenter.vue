<template>
  <div class="content">
    <ibird-nav />
    <div class="center-banner">
      <el-image
        :src="src"
        fill="fill"
        class="banner-img">

      </el-image>
    </div>
    <div class="avatar-img">
      <el-avatar :size="130" :src="avatarUrl" style="border: 2px solid #ffffff;">
      </el-avatar>
    </div>
    <div class="user-name">
      <span>Ctwo</span>
    </div>

    <el-tabs
      tab-position="right"
      class="card-selector"
    >

      <el-tab-pane>

        <span slot="label"><el-image class="icon-img"
                                     :src="src1"
                                     fill="fill"
        >
        </el-image><p class="tip">个人动态</p></span>
        个人信息
        <div class="personal-moments">
          <el-row v-for="i in count">
            <el-col :span="24">
              <ibird-moments
                class="moment-card"
                username="组件传参测试"
                moment="还行"
              /></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane class="card2">
        <span slot="label"><el-image class="icon-img"
                                     :src="src2"
                                     fill="fill"
                                     style="height: 14px;width: 14px;"
        >
        </el-image><p class="tip">个人相册</p></span>
        <div class="title"><p class="title-text">PHOTO GALLERY</p><div class="hengxian"></div></div>
        <div class="gallery">
        <el-scrollbar style="height: 100%;">
        <ul>
            <div class="home">
              <div class="bannerArr">
                <div class="img-item" v-for="(item,index) in banners" >
                  <img v-image-preview class="img" :src="item.imgUrl"/>
                </div>
              </div>
            </div>
          <!--            <li v-for="i in count" class="list-item" style="height: 20px">{{ i }}</li>-->
          </ul>
          </el-scrollbar>
          </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import NavBar from '../components/navbar'
import MomentsCard from '../components/MomentsCard'
// 引入插件
import { swiper, swiperSlide } from "vue-awesome-swiper";
import "swiper/css/swiper.css";
import "@/assets/css/scrollbar.css"
export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-moments': MomentsCard,
    swiper,
    swiperSlide
  },
  data() {
    return {
      banners: [
        { imgUrl: 'static/img/gallery_1.jpeg' },
        { imgUrl: 'static/img/gallery_2.png' },
        { imgUrl: 'static/img/gallery_3.jpg' },
        { imgUrl: 'static/img/gallery_3.jpg' },
        { imgUrl: 'static/img/gallery_2.png' },
        { imgUrl: 'static/img/gallery_1.jpeg' },
        { imgUrl: 'static/img/gallery_1.jpeg' },
        { imgUrl: 'static/img/gallery_2.png' },
        { imgUrl: 'static/img/gallery_3.jpg' },
        { imgUrl: 'static/img/gallery_2.png' },
        { imgUrl: 'static/img/gallery_1.jpeg' },
        { imgUrl: 'static/img/gallery_1.jpeg' },
        { imgUrl: 'static/img/gallery_2.png' },
        { imgUrl: 'static/img/gallery_3.jpg' }
      ],
      src : "../static/img/banner.png",
      src1: "../static/img/bell.png",
      src2: "../static/img/camera.png",
      avatarUrl: "../static/img/profile.jpg",
      count: 10,
      loading: false,
      swiperOption: {
        loop: true,
        slidesPerView: 3,
        slidesPerColumn: 3,
        slidesPerColumnFill:'row',
        spaceBetween: 0.1, //轮播图之间的间距
        direction: 'horizontal',//设置垂直vertical
        //不需要自动轮播时
        autoplay: false,
        // 如果需要滚动条
        scrollbar: {
          el: '.swiper-scrollbar',
        },
      }
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    noMore () {
      return this.count >= 20
    },
    disabled(){
      return this.noMore || this.loading
    },
  },
  mounted() {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log("this is current swiper instance object", this.swiper);
    // this.swiper.slideTo(3, 1000, false);
  },
  // 这里到时候联网
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    },
  }
}
</script>

<style scoped>
.card2{
  width: 81%;
  float: right;
}
.title{
  width: 100%;
  position: relative;
  background-color: black;
  font-family: 'Algerian';
  font-size: 22px;
  display: table;
  color: #f1eeee;
  height: 100%;
}
.title-text{
  vertical-align: center;
  margin-right: 330px;
}
.hengxian{
  border:0.8px solid #7e7c7c;
  width: 90%;
  background-color: black;
  position: absolute;
  left: 50%;
  transform: translate(-50%,-50%);
}
.gallery{
  height: 400px;
  margin-bottom: 100px;
  background-color: black;
}
.home {
  width: 100%;
  height: 100%;
  position: relative;
  background-color: black;
}
.bannerArr{
  width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
}
.img-item{
  width: 160px;
  height: 160px;
  padding: 5px;
  box-sizing: border-box;
}
.img{
  width: 100%;
  height: 100%;
  border: 1px solid #E3E3E3;
}
.card-selector {
  margin-top: 30px;
  position: relative;
  width: 65%;
  display: inline-block;
}

.banner-img {
  width: 76%;
  margin-top: 20px;
}

.avatar-img {
  position: relative;
  margin-top: -100px;
}
.user-name > span {
  font-size: 28px;
}
.personal-moments {
  height: 360px;
  overflow-y: scroll;
  margin-bottom: 100px;
}

.moment-card {
  margin-top: 20px;
}

.tip{
  display: inline-block;
  vertical-align: middle;
}
.icon-img{
  vertical-align: middle;
  height: 16px;
  width: 16px;
  margin-right: 5px;
}
.user-name{
  margin-bottom: 20px;
}
</style>
