<template>
  <div class="content">
    <div class="header">
      <ibird-nav />
    </div>
    <div class="center-banner">
      <el-image
      :src="src"
      fill="fill"
      class="banner-img">

      </el-image>
    </div>
    <div class="avatar-img">
      <el-avatar :size="250" :src="avatarUrl">
      </el-avatar>
    </div>
    <div class="user-name">
      <span>Ctwo</span>
    </div>

    <el-tabs
      tab-position="right"
      class="card-selector"
    >

      <el-tab-pane class="card">
        <span slot="label"><i class="el-icon-bell"></i>个人动态</span>
        个人信息
        <div class="personal-moments">
          <el-row v-for="i in count">
            <el-col :span="24"><ibird-moments class="moment-card"/></el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane class="card">
        <span slot="label"><i class="el-icon-camera"></i>个人相册</span>
        个人相册
        <div class="infinite-list">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
          >
            <el-row v-for="i in count">
              <el-col :span="8"><el-image :src="url_1" fit="fill" class="gallery"></el-image></el-col>
              <el-col :span="8"><el-image :src="url_2" fit="fill" class="gallery"></el-image></el-col>
              <el-col :span="8"><el-image :src="url_3" fit="fill" class="gallery"></el-image></el-col>
            </el-row>
<!--            <li v-for="i in count" class="list-item" style="height: 20px">{{ i }}</li>-->
          </ul>
          <p v-if="loading">加载中...</p>
          <p v-if="noMore">没有更多了</p>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
import NavBar from '../components/navbar'
import MomentsCard from '../components/MomentsCard'
export default {
  components: {
    'ibird-nav': NavBar,
    'ibird-moments': MomentsCard,
  },
  data() {
    return {
      src : "../static/img/banner.jpg",
      avatarUrl: "../static/img/avatar_test.png",
      count: 10,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled(){
      return this.noMore || this.loading
    },
    // 在这里动态填充图片
    url_1(){
      console.log(this.count);
      return "../static/img/gallery_1.jpeg"
    },
    url_2(){
      return "../static/img/gallery_2.png"
    },
    url_3(){
      return "../static/img/gallery_3.jpg"
    }
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
.card-selector {
  margin-top: 30px;
  position: relative;
  width: 65%;
  display: inline-block;
}

.card {
  width: 90%;
}

.banner-img {
  width: 100%;
  margin-top: 20px;
}

.el-icon-bell {
  width: 30px;
}

.el-icon-camera {
  width: 30px;
}

.avatar-img {
  position: relative;
  margin-top: -100px;
}
.user-name > span {
  font-size: 30px;
}

.infinite-list {
  overflow-x:hidden;
  overflow-y:scroll;
  height: 360px;
}

.personal-moments {
  height: 360px;
  overflow-y: scroll;
}

.gallery {
  height: 200px;
  margin-bottom: 15px;
}

.moment-card {
  margin-top: 20px;
}
</style>
