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
        <div class="card1">
        <el-row v-for="i in count" class="card1-item">
          <el-col :span="24" :push="5">
            <ibird-moments style="width: 75%;"
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
        <div class="title"><p class="title-text">PHOTO GALLERY</p></div>
        <div class="gallery">
          <el-scrollbar style="height: 100%;" ref="gcScrollbar" class="table_device">
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
import "@/assets/css/scrollbar.css"
export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-moments': MomentsCard
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
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled(){
      return this.noMore || this.loading
    },
  },
  mounted() {

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
.card-selector{

}
.card1-item{
  position: relative;
}
.card1{
  margin-bottom: 50px;
}
.card2{
  width: 580px;
  float: right;
  margin-bottom: 0;
}
.title{
  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
  width: 580px;
  position: relative;
  background-color: #ca917d;
  font-family: 'Algerian';
  font-size: 22px;
  display: table;
  color: #f1eeee;
  height: 100%;
  border-bottom: 1px solid #f1eeee;
}
.title-text{
  vertical-align: center;
  margin-right: 330px;
}
.gallery {
  width: 580px;
  height: 400px;
  margin-bottom: 100px;
  background-color: #ca917d;
}
.home {
  width: 500px;
  height: 100%;
  position: relative;
  background-color: rgba(53, 52, 54, 0.5);
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
  margin: 3px;
  box-sizing: border-box;

  border:none;
  border-radius:5px;
  box-shadow: 0 0 0 1px hsla(240,0%,100%,.3) inset,
  0 .5em 1em rgba(0, 0, 0, 0.6);
  background-color: rgba(100,100,100,.2);
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
